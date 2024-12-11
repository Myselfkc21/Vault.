import express, { response } from "express";
import cors from "cors";
import pool from "./db/index.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import authenticateJWT from "./middleware/middleware.js";
import multer from "multer";
import fs from "fs";
import path from "path"; // ES Module import
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// const upload = multer({ dest: "uploads/" }); //create the folder in the server where images r stored

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });

//Signup API
app.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log(fullname, email, password);
  const checkUser = await pool.query("select * from users where email=$1", [
    email,
  ]);
  if (checkUser.rows.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    const result = await pool.query(
      "INSERT INTO users (id,fullname, email, password) VALUES (DEFAULT ,$1, $2, $3) RETURNING *",
      [fullname, email, password]
    );
    return res.status(200).json({ message: "User created successfully" });
  }
});

//Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("dammn");
  try {
    const checkUser = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    console.log("checkUser", checkUser);

    if (checkUser.rows.length === 0) {
      return res.status(400).json({ message: "Sign up first" });
    }

    const user = checkUser.rows[0];

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

//Upload API
app.post(
  "/upload",
  authenticateJWT,
  upload.single("file"),
  async (req, res) => {
    // console.log(req.file);
    const { filename, shortdescription, filetype } = req.body;
    // console.log(filename, shortdescription, filetype);
    try {
      const file_type = filetype;
      const file_size = req.file.size;
      const uploaded_at = new Date();
      const file_path = req.file.path;
      const file_name = filename;
      const user_id = req.user.id;
      const access_level = "user";
      const short_description = shortdescription;
      // console.log(user_id);
      const result = await pool.query(
        "INSERT INTO files (file_id,user_id,file_name, file_type,file_size,uploaded_at, access_level, file_path,file_desc) VALUES (default ,$1, $2, $3, $4,$5,$6,$7,$8) RETURNING *",
        [
          user_id,
          file_name,
          file_type,
          file_size,
          uploaded_at,
          access_level,
          file_path,
          short_description,
        ]
      );
      return res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
);

//Get all files
app.get("/get_all_files", authenticateJWT, async (req, res) => {
  const user_id = req.user.id;
  const result = await pool.query("SELECT * FROM files WHERE user_id=$1", [
    user_id,
  ]);
  return res.status(200).json({ files: result.rows });
});

app.get("/files", authenticateJWT, async (req, res) => {
  const user_id = req.user.id;
  const result = await pool.query(
    "SELECT * FROM files WHERE user_id=$1 AND pinned=true",
    [user_id]
  );
  return res.status(200).json({ files: result.rows });
});

//Pin file
app.post("/pin_file", authenticateJWT, async (req, res) => {
  const file_id = req.body.file_id;
  const pinned = req.body.pinned;
  try {
    if (pinned) {
      const result = await pool.query(
        "UPDATE files SET pinned=true WHERE file_id=$1",
        [file_id]
      );
      return res.status(200).json({ message: "File pinned successfully" });
    } else {
      const result = await pool.query(
        "UPDATE files SET pinned=false WHERE file_id=$1",
        [file_id]
      );
      return res.status(200).json({ message: "File unpinned successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

//Download file
app.get("/files/:file_id", authenticateJWT, async (req, res) => {
  const file_id = req.params.file_id;
  console.log(file_id);
  const result = await pool.query("SELECT * FROM files WHERE file_id=$1", [
    file_id,
  ]);
  console.log(result.rows);
  const file = result.rows[0];

  const filePath = path.join(__dirname, file.file_path);
  console.log(filePath);
  // Check if file exists before sending the download
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "File not found on server" });
    }

    // Send the file as a download
    res.download(filePath, file.file_name, (downloadError) => {
      if (downloadError) {
        return res.status(500).json({
          message: "Error downloading file",
          error: downloadError.message,
        });
      }
    });
  });
});

//Delete file
app.delete("/files/:file_id", authenticateJWT, async (req, res) => {
  const file_id = req.params.file_id;
  const result = await pool.query(
    "DELETE FROM files WHERE file_id=$1 returning *",
    [file_id]
  );
  const filePath = path.join(__dirname, result.rows[0].file_path);
  console.log(filePath);
  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting file" });
    }
  });
  return res.status(200).json({ message: "File deleted successfully" });
});

//Get user
app.get("/get_user", authenticateJWT, async (req, res) => {
  try {
    const user_id = req.user.id;
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [
      user_id,
    ]);
    return res.status(200).json({ user: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

//Admin login
app.post("/admin_login", async (req, res) => {
  const { email, code } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM admins WHERE email=$1 AND code=$2",
      [email, code]
    );
    const token = jwt.sign(
      { id: result.rows[0].id, email: result.rows[0].email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

//Admin dashboard
app.get("/admin_dashboard", authenticateJWT, async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    const files = await pool.query("SELECT * FROM files");
    const username = await pool.query("SELECT id, fullname, email FROM users");
    const updates = await pool.query(
      "SELECT user_id, uploaded_at FROM files ORDER BY uploaded_at DESC LIMIT 5"
    );

    const username_updates = await Promise.all(
      updates.rows.map(async (update) => {
        const userResult = await pool.query(
          "SELECT fullname FROM users WHERE id=$1",
          [update.user_id]
        );
        return {
          ...update,
          username: userResult.rows[0]?.fullname || "Unknown User", // Fallback if no user is found
        };
      })
    );

    return res.status(200).json({
      users: users.rows,
      files: files.rows,
      userDetails: username.rows,
      updates: username_updates,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

//Logout
app.post("/logout", authenticateJWT, async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
});

//delete user
app.delete("/delete_user", authenticateJWT, async (req, res) => {
  try {
    const user_id = req.body.user_id;

    // Delete user from the users table
    const userResult = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      [user_id]
    );

    if (userResult.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch and delete associated files
    const fileResults = await pool.query(
      "DELETE FROM files WHERE user_id=$1 RETURNING *",
      [user_id]
    );

    if (fileResults.rows.length === 0) {
      return res
        .status(200)
        .json({ message: "User deleted, no files to delete" });
    }

    // Iterate over all files and delete them
    const deletionPromises = fileResults.rows.map((file) => {
      const filePath = path.join(__dirname, file.file_path);
      return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file ${filePath}:`, err);
            return reject(err);
          }
          resolve();
        });
      });
    });

    // Wait for all deletions to complete
    await Promise.all(deletionPromises);

    return res
      .status(200)
      .json({ message: "User and files deleted successfully" });
  } catch (error) {
    console.error("Error during delete_user:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

//Search
app.post("/search", authenticateJWT, async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm;
    const user_id = req.user.id;
    const result = await pool.query(
      "SELECT * FROM files WHERE lower(file_name) LIKE $1 and user_id=$2",
      [`%${searchTerm}%`, user_id]
    );
    return res.status(200).json({ files: result.rows });
  } catch (error) {
    return res.status(500).json({ message: "no files exists" });
  }
});

// -----------------Active Jobs Dashboard -----------------
//Add job
app.post("/upload_jobs", authenticateJWT, async (req, res) => {
  try {
    const {
      user_id,
      job_title,
      client_bill,
      pay_rate,
      client,
      end_client,
      location,
      status,
      job_description,
      job_code,
      priority,
    } = req.body;
    console.log(req.body);
    const created_at = new Date();
    const result = await pool.query(
      "INSERT INTO jobs (job_id, user_id, job_title, client_bill, pay_rate, client, end_client, location, status, job_description, job_code, created_at, priority) VALUES (default, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [
        user_id,
        job_title,
        client_bill,
        pay_rate,
        client,
        end_client,
        location,
        status,
        job_description,
        job_code,
        created_at,
        priority,
      ]
    );
    return res.status(200).json({ message: "Job uploaded successfully" });
  } catch (error) {
    console.error("Error uploading job:", error); // Improved error logging
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
});

//Get all jobs
app.get("/get_all_jobs", authenticateJWT, async (req, res) => {
  const user_id = req.user.id;
  const result = await pool.query("SELECT * FROM jobs WHERE user_id=$1", [
    user_id,
  ]);
  return res.status(200).json({ jobs: result.rows });
});

//Get the selected job
app.get("/get_to_edit_job/:job_id", authenticateJWT, async (req, res) => {
  const job_id = req.params.job_id;
  const result = await pool.query("select * from jobs where job_id=$1", [
    job_id,
  ]);
  return res.status(200).json({ jobs: result.rows });
});

//Update job
app.put("/update_job/:job_id", authenticateJWT, async (req, res) => {
  const job_id = req.params.job_id;
  const {
    job_title,
    client_bill,
    pay_rate,
    client,
    end_client,
    location,
    status,
    job_description,
    job_code,
    priority,
  } = req.body;
  const result = await pool.query(
    "update jobs set job_title=$1, client_bill=$2, pay_rate=$3, client=$4, end_client=$5, location=$6, status=$7, job_description=$8, job_code=$9, priority=$10 where job_id=$11",
    [
      job_title,
      client_bill,
      pay_rate,
      client,
      end_client,
      location,
      status,
      job_description,
      job_code,
      priority,
      job_id,
    ]
  );
  return res.status(200).json({ message: "Job updated successfully" });
});

//Delete job
app.delete("/delete_job/:job_id", authenticateJWT, async (req, res) => {
  const job_id = req.params.job_id;
  const result = await pool.query("DELETE FROM jobs WHERE job_id=$1", [job_id]);
  return res.status(200).json({ message: "Job deleted successfully" });
});

// -----------------Applicants Page ----------------- //

//get all the applicant data of the user.
app.get("/get_aplicant_submissions/", authenticateJWT, async (req, res) => {
  const user_id = req.user.id;
  const result = await pool.query(
    "select * from applicantsubmissions where user_id=$1",
    [user_id]
  );
  console.log("applicant data", result.rows);
  return res.status(200).json({ applicantsubmissions: result.rows });
});

app.get(
  "/get_selected_applicant_data/:job_id",
  authenticateJWT,
  async (req, res) => {
    try {
      const job_id = req.params.job_id;
      const user_id = req.user.id;
      console.log("job_id:", job_id, "user_id:", user_id);

      const result = await pool.query(
        "SELECT * FROM applicantsubmissions WHERE applicant_id = $1 AND user_id = $2",
        [job_id, user_id]
      );

      console.log(result.rows);
      return res.status(200).json({ applicantsubmissions: result.rows });
    } catch (error) {
      console.error("Error fetching applicant data:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
//Update the applicant data
app.put(
  "/update_applicant_submissions/:applicant_id",
  authenticateJWT,
  async (req, res) => {
    const user_id = req.user.id;
    const applicant_id = req.params.applicant_id;
    const {
      JobApplied,
      Joblocation,
      jobCode,
      clientJobId,
      clientName,
      clientManager,
      RecruitmentManager,
      SalesManager,
      PrimaryRecruiter,
      ApplicantLoaction,
      AppliantName,
    } = req.body;

    try {
      const result = await pool.query(
        `UPDATE applicantsubmissions
         SET 
           jobapplied = $1,
           joblocation = $2,
           jobcode = $3,
           clientjobid = $4,
           clientname = $5,
           clientmanager = $6,
           recruitmentmanager = $7,
           salesmanager = $8,
           primaryrecruiter = $9,
           applicantlocation = $10,
           applicantname=$11
         WHERE user_id = $12 AND applicant_id = $13`,
        [
          JobApplied,
          Joblocation,
          jobCode,
          clientJobId,
          clientName,
          clientManager,
          RecruitmentManager,
          SalesManager,
          PrimaryRecruiter,
          ApplicantLoaction,
          AppliantName,
          user_id,
          applicant_id,
        ]
      );
      return res
        .status(200)
        .json({ message: "Applicant updated successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error updating applicant submission" });
    }
  }
);

//Delete the applicant
app.delete(
  "/delete_applicant_submissions/:applicant_id",
  authenticateJWT,
  async (req, res) => {
    try {
      const user_id = req.user.id;
      const applicant_id = req.params.applicant_id;
      const result = await pool.query(
        "DELETE FROM applicantsubmissions WHERE user_id=$1 AND applicant_id=$2",
        [user_id, applicant_id]
      );
      return res
        .status(200)
        .json({ message: "Applicant deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error deleting applicant submission" });
    }
  }
);

app.post("/add_applicant_submissions", authenticateJWT, async (req, res) => {
  try {
    const user_id = req.user.id;
    const {
      JobApplied,
      Joblocation,
      jobCode,
      clientJobId,
      clientName,
      clientManager,
      RecruitmentManager,
      SalesManager,
      PrimaryRecruiter,
      ApplicantLocation,
      AppliantName,
      applicant_id,
    } = req.body;

    const result = await pool.query(
      `Insert into applicantsubmissions
    (jobapplied,joblocation,jobcode,clientjobid,clientname,clientmanager,recruitmentmanager,salesmanager,primaryrecruiter,applicantlocation,applicantname,user_id,applicantid)
      values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,$13)`,
      [
        JobApplied,
        Joblocation,
        jobCode,
        clientJobId,
        clientName,
        clientManager,
        RecruitmentManager,
        SalesManager,
        PrimaryRecruiter,
        ApplicantLocation,
        AppliantName,
        user_id,
        applicant_id,
      ]
    );
    return res.status(200).json({ message: "Applicant added successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error adding applicant submission" });
  }
});

// ---------------client Page------------------//

//get all clients submissions
app.get("/get_client_submissions", authenticateJWT, async (req, res) => {
  try {
    const user = req.user.id;
    const result = await pool.query("Select * from clients where user_id=$1", [
      user,
    ]);
    return res.status(200).json({ clients: result.rows });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// add new client submissions
app.post("/add_client_submissions", authenticateJWT, async (req, res) => {
  try {
    const user = req.user.id;
    console.log("here", req.body);
    const {
      jobCode,
      JobApplied,
      JobLocation,
      clientId,
      clientName,
      clientManager,
      recruitmentManager,
      salesManager,
      primaryRecruiter,
      applicantID,
      applicantName,
      applicantLastname,
      applicantEmail,
      applicantMobile,
      status,
    } = req.body;

    console.log(req.body);

    const result = await pool.query(
      `
      INSERT INTO clients
      (
        user_id, 
        job_code, 
        job_applied, 
        job_location, 
        client_id, 
        client_name, 
        client_manager, 
        recruitment_manager, 
        sales_manager, 
        primary_recruiter, 
        applicant_id, 
        applicant_name, 
        applicant_lastname, 
        email_address, 
        mobile,
        status
      ) 
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,$16
      )`,
      [
        user,
        jobCode,
        JobApplied,
        JobLocation,
        clientId,
        clientName,
        clientManager,
        recruitmentManager,
        salesManager,
        primaryRecruiter,
        applicantID,
        applicantName,
        applicantLastname,
        applicantEmail,
        applicantMobile,
        status,
      ]
    );
    console.log("RESULT", result);
    res.status(201).json({ message: "Client submission added successfully." });
  } catch (err) {
    console.error("Error inserting client submission:", err);
    res
      .status(500)
      .json({ message: "Error adding client submission", error: err.message });
  }
});

//get the selected client submissions
app.get("/get_selected_client_data/:id", authenticateJWT, async (req, res) => {
  try {
    const clientsubmission_id = req.params.id;
    const user = req.user.id;
    const result = await pool.query(
      "Select * from clients where clientsubmission_id=$1 and user_id=$2",
      [clientsubmission_id, user]
    );
    return res.status(200).json({ clients: result.rows });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//update client submissions
app.put("/update_client_submissions/:id", authenticateJWT, async (req, res) => {
  try {
    const clientsubmission_id = req.params.id;
    const user = req.user.id;
    const {
      jobCode,
      JobApplied,
      JobLocation,
      clientId,
      clientName,
      clientManager,
      recruitmentManager,
      salesManager,
      primaryRecruiter,
      applicantID,
      applicantName,
      applicantLastname,
      applicantEmail,
      applicantMobile,
    } = req.body;
    console.log(req.body);
    const result = await pool.query(
      "update clients set job_code=$1, job_applied=$2, job_location=$3, client_id=$4, client_name=$5, client_manager=$6, recruitment_manager=$7, sales_manager=$8, primary_recruiter=$9, applicant_id=$10, applicant_name=$11, applicant_lastname=$12, email_address=$13, mobile=$14 where  clientsubmission_id=$15",
      [
        jobCode,
        JobApplied,
        JobLocation,
        clientId,
        clientName,
        clientManager,
        recruitmentManager,
        salesManager,
        primaryRecruiter,
        applicantID,
        applicantName,
        applicantLastname,
        applicantEmail,
        applicantMobile,
        clientsubmission_id,
      ]
    );
    res
      .status(200)
      .json({ message: "Client submission updated successfully." });
  } catch (error) {
    console.error("Error updating client submission:", error);
    res.status(500).json({
      message: "Error updating client submission",
      error: error.message,
    });
  }
});

//delete client submissions
app.delete(
  "/delete_client_submissions/:id",
  authenticateJWT,
  async (req, res) => {
    try {
      const clientsubmission_id = req.params.id;
      const user = req.user.id;
      const result = await pool.query(
        "delete from clients where clientsubmission_id=$1 and user_id=$2",
        [clientsubmission_id, user]
      );
      res
        .status(200)
        .json({ message: "Client submission deleted successfully." });
    } catch (error) {
      console.error("Error deleting client submission:", error);
      res.status(500).json({
        message: "Error deleting client submission",
        error: error.message,
      });
    }
  }
);

//------------Served Jobs--------------//

app.get("/get_served_jobs", authenticateJWT, async (req, res) => {
  try {
    const user = req.user.id;
    const result = await pool.query(
      "Select * from served_jobs where user_id=$1",
      [user]
    );
    return res.status(200).json({ jobs: result.rows });
  } catch (error) {}
});
pool
  .connect()
  .then((client) => {
    console.log("Connected to the aws database");
    client.release(); // Release the client back to the pool
  })
  .catch((err) => {
    console.error("Error connecting to aws database", err);
  });
app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});

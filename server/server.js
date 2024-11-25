import express from "express";
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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

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

app.get("/dashboard", authenticateJWT, (req, res) => {
  const { file_name, upload_data, file } = req.body;
  console.log(file_name, upload_data, file);
});

app.post("/upload", authenticateJWT, upload.single("file"), async (req, res) => {
    console.log(req.file);
    const { filename, shortdescription, filetype } = req.body;
    console.log(filename, shortdescription, filetype);
    try {
      const file_type = filetype;
      const file_size = req.file.size;
      const uploaded_at = new Date();
      const file_path = req.file.path;
      const file_name = filename;
      const user_id = req.user.id;
      const access_level = "user";
      const short_description = shortdescription;
      console.log(user_id);
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
      return res.status(500).json({ message: "Server error" });
    }
  }
);

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

app.delete("/files/:file_id", authenticateJWT, async (req, res) => {
  const file_id = req.params.file_id;
  const result = await pool.query("DELETE FROM files WHERE file_id=$1", [
    file_id,
  ]);
  return res.status(200).json({ message: "File deleted successfully" });
});

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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

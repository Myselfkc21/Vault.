import pg from "pg";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGNAME,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  // ssl: {
  //   rejectUnauthorized: true,
  //   ca: fs.readFileSync("./certs/Tembo-Instance-Certificate.crt").toString(),
  // },
});

// pool.query("SELECT NOW()", (err, res) => {
//   if (err) {
//     console.error("Error connecting to database:", err.stack);
//   } else {
//     console.log("Connection successful:", res.rows, process.env.PGDATABASE);
//   }
//   pool.end();
// });

export default pool;

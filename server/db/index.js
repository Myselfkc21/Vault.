import pg from "pg";
import fs from "fs";
const { Pool } = pg;
const pool = new Pool({
  user: "postgres",
  host: "questionably-pro-gar.data-1.use1.tembo.io",
  database: "postgres",
  password: "exzHbGvQ8uQIxwCx",
  port: 5432,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./certs/Tembo-Instance-Certificate.crt").toString(),
  },
});

export default pool;

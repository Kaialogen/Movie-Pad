require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: "moviepad-users",
});

module.exports = pool;

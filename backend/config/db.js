const { Pool } = require("pg");

const pool = new Pool({
  user: "talhaimtiaz", // Replace with your PostgreSQL username
  host: "localhost", // Replace with your PostgreSQL host
  database: "inventory", // Replace with your PostgreSQL database name
  password: "root", // Replace with your PostgreSQL password
  port: 5432, // Replace with your PostgreSQL port if different
});

module.exports = { pool };

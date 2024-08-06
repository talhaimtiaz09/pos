const { pool } = require("../config/db");

// Fetch all accounts
const getAll = async () => {
  const result = await pool.query("SELECT * FROM accounts");
  return result.rows;
};

// Fetch an account by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM accounts WHERE id = $1", [id]);
  return result.rows[0];
};

// Create a new account
const create = async (account) => {
  const { name, category, min_limit, max_limit, balance, owner_id } = account;
  const result = await pool.query(
    "INSERT INTO accounts (name, category, min_limit, max_limit, balance, owner_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, category, min_limit, max_limit, balance, owner_id]
  );
  return result.rows[0];
};

// Update an account
const update = async (id, account) => {
  const { name, category, min_limit, max_limit, balance, owner_id } = account;
  const result = await pool.query(
    "UPDATE accounts SET name = $1, category = $2, min_limit = $3, max_limit = $4, balance = $5, owner_id = $6 WHERE id = $7 RETURNING *",
    [name, category, min_limit, max_limit, balance, owner_id, id]
  );
  return result.rows[0];
};

// Delete an account
const remove = async (id) => {
  await pool.query("DELETE FROM accounts WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

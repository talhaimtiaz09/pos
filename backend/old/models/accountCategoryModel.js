const { pool } = require("../config/db");

// Fetch all account categories
const getAll = async () => {
  const result = await pool.query("SELECT * FROM account_categories");
  return result.rows;
};

// Fetch an account category by ID
const getById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM account_categories WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

// Create a new account category
const create = async (category) => {
  const { name } = category;
  const result = await pool.query(
    "INSERT INTO account_categories (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
};

// Update an account category
const update = async (id, category) => {
  const { name } = category;
  const result = await pool.query(
    "UPDATE account_categories SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );
  return result.rows[0];
};

// Delete an account category
const remove = async (id) => {
  await pool.query("DELETE FROM account_categories WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

const { pool } = require("../config/db");

// Fetch all expense categories
const getAll = async () => {
  const result = await pool.query("SELECT * FROM expense_categories");
  return result.rows;
};

// Fetch an expense category by ID
const getById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM expense_categories WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

// Create a new expense category
const create = async (category) => {
  const { name } = category;
  const result = await pool.query(
    "INSERT INTO expense_categories (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
};

// Update an expense category
const update = async (id, category) => {
  const { name } = category;
  const result = await pool.query(
    "UPDATE expense_categories SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );
  return result.rows[0];
};

// Delete an expense category
const remove = async (id) => {
  await pool.query("DELETE FROM expense_categories WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

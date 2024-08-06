const { pool } = require("../config/db");

// Fetch all expenses
const getAll = async () => {
  const result = await pool.query("SELECT * FROM expenses");
  return result.rows;
};

// Fetch an expense by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM expenses WHERE id = $1", [id]);
  return result.rows[0];
};

// Create a new expense
const create = async (expense) => {
  const { amount, category, account_id } = expense;
  const result = await pool.query(
    "INSERT INTO expenses (amount, category, account_id) VALUES ($1, $2, $3) RETURNING *",
    [amount, category, account_id]
  );
  return result.rows[0];
};

// Update an expense
const update = async (id, expense) => {
  const { amount, category, account_id } = expense;
  const result = await pool.query(
    "UPDATE expenses SET amount = $1, category = $2, account_id = $3 WHERE id = $4 RETURNING *",
    [amount, category, account_id, id]
  );
  return result.rows[0];
};

// Delete an expense
const remove = async (id) => {
  await pool.query("DELETE FROM expenses WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

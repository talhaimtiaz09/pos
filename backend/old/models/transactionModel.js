const { pool } = require("../config/db");

// Fetch all transactions
const getAll = async () => {
  const result = await pool.query("SELECT * FROM transactions");
  return result.rows;
};

// Fetch a transaction by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM transactions WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

// Create a new transaction
const create = async (transaction) => {
  const { amount, transaction_type, from_account_id, to_account_id } =
    transaction;
  const result = await pool.query(
    "INSERT INTO transactions (amount, transaction_type, from_account_id, to_account_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [amount, transaction_type, from_account_id, to_account_id]
  );
  return result.rows[0];
};

// Update a transaction
const update = async (id, transaction) => {
  const { amount, transaction_type, from_account_id, to_account_id } =
    transaction;
  const result = await pool.query(
    "UPDATE transactions SET amount = $1, transaction_type = $2, from_account_id = $3, to_account_id = $4 WHERE id = $5 RETURNING *",
    [amount, transaction_type, from_account_id, to_account_id, id]
  );
  return result.rows[0];
};

// Delete a transaction
const remove = async (id) => {
  await pool.query("DELETE FROM transactions WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

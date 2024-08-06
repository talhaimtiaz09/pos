const { pool } = require("../config/db");

// Fetch all invoices
const getAll = async () => {
  const result = await pool.query("SELECT * FROM invoices");
  return result.rows;
};

// Fetch an invoice by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM invoices WHERE id = $1", [id]);
  return result.rows[0];
};

// Create a new invoice
const create = async (invoice) => {
  const { customer_id, date, total_amount } = invoice;
  const result = await pool.query(
    "INSERT INTO invoices (customer_id, date, total_amount) VALUES ($1, $2, $3) RETURNING *",
    [customer_id, date, total_amount]
  );
  return result.rows[0];
};

// Update an invoice
const update = async (id, invoice) => {
  const { customer_id, date, total_amount } = invoice;
  const result = await pool.query(
    "UPDATE invoices SET customer_id = $1, date = $2, total_amount = $3 WHERE id = $4 RETURNING *",
    [customer_id, date, total_amount, id]
  );
  return result.rows[0];
};

// Delete an invoice
const remove = async (id) => {
  await pool.query("DELETE FROM invoices WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

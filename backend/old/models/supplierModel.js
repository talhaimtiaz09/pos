const { pool } = require("../config/db");

// Fetch all suppliers
const getAll = async () => {
  const result = await pool.query("SELECT * FROM suppliers");
  return result.rows;
};

// Fetch a supplier by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM suppliers WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

// Create a new supplier
const create = async (supplier) => {
  const { name, contact, address } = supplier;
  const result = await pool.query(
    "INSERT INTO suppliers (name, contact, address) VALUES ($1, $2, $3) RETURNING *",
    [name, contact, address]
  );
  return result.rows[0];
};

// Update a supplier
const update = async (id, supplier) => {
  const { name, contact, address } = supplier;
  const result = await pool.query(
    "UPDATE suppliers SET name = $1, contact = $2, address = $3 WHERE id = $4 RETURNING *",
    [name, contact, address, id]
  );
  return result.rows[0];
};

// Delete a supplier
const remove = async (id) => {
  await pool.query("DELETE FROM suppliers WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

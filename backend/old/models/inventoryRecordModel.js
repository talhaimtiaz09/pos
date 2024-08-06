const { pool } = require("../config/db");

// Fetch all inventory records
const getAll = async () => {
  const result = await pool.query("SELECT * FROM inventory_records");
  return result.rows;
};

// Fetch an inventory record by ID
const getById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM inventory_records WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

// Create a new inventory record
const create = async (record) => {
  const { inventory_id, batch_id, quantity, record_type } = record;
  const result = await pool.query(
    "INSERT INTO inventory_records (inventory_id, batch_id, quantity, record_type) VALUES ($1, $2, $3, $4) RETURNING *",
    [inventory_id, batch_id, quantity, record_type]
  );
  return result.rows[0];
};

// Update an inventory record
const update = async (id, record) => {
  const { inventory_id, batch_id, quantity, record_type } = record;
  const result = await pool.query(
    "UPDATE inventory_records SET inventory_id = $1, batch_id = $2, quantity = $3, record_type = $4 WHERE id = $5 RETURNING *",
    [inventory_id, batch_id, quantity, record_type, id]
  );
  return result.rows[0];
};

// Delete an inventory record
const remove = async (id) => {
  await pool.query("DELETE FROM inventory_records WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

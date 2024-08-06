const { pool } = require("../config/db");

// Fetch all inventories
const getAll = async () => {
  const result = await pool.query("SELECT * FROM inventory");
  return result.rows;
};

// Fetch an inventory by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM inventory WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

// Create a new inventory
const create = async (inventory) => {
  const { product_id, warehouse_id, quantity, min_quantity, max_quantity } =
    inventory;
  const result = await pool.query(
    "INSERT INTO inventory (product_id, warehouse_id, quantity, min_quantity, max_quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [product_id, warehouse_id, quantity, min_quantity, max_quantity]
  );
  return result.rows[0];
};

// Update an inventory
const update = async (id, inventory) => {
  const { product_id, warehouse_id, quantity, min_quantity, max_quantity } =
    inventory;
  const result = await pool.query(
    "UPDATE inventory SET product_id = $1, warehouse_id = $2, quantity = $3, min_quantity = $4, max_quantity = $5 WHERE id = $6 RETURNING *",
    [product_id, warehouse_id, quantity, min_quantity, max_quantity, id]
  );
  return result.rows[0];
};

// Delete an inventory
const remove = async (id) => {
  await pool.query("DELETE FROM inventory WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

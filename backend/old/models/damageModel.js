const { pool } = require("../config/db");

// Fetch all damages
const getAll = async () => {
  const result = await pool.query("SELECT * FROM damages");
  return result.rows;
};

// Fetch a damage by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM damages WHERE id = $1", [id]);
  return result.rows[0];
};

// Create a new damage
const create = async (damage) => {
  const { item_id, quantity, damage_date } = damage;
  const result = await pool.query(
    "INSERT INTO damages (item_id, quantity, damage_date) VALUES ($1, $2, $3) RETURNING *",
    [item_id, quantity, damage_date]
  );
  return result.rows[0];
};

// Update a damage
const update = async (id, damage) => {
  const { item_id, quantity, damage_date } = damage;
  const result = await pool.query(
    "UPDATE damages SET item_id = $1, quantity = $2, damage_date = $3 WHERE id = $4 RETURNING *",
    [item_id, quantity, damage_date, id]
  );
  return result.rows[0];
};

// Delete a damage
const remove = async (id) => {
  await pool.query("DELETE FROM damages WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

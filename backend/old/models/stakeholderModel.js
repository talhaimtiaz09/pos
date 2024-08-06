const { pool } = require("../config/db");

// Fetch all stakeholders
const getAll = async () => {
  const result = await pool.query("SELECT * FROM stakeholder");
  return result.rows;
};

// Fetch a stakeholder by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM stakeholder WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

// Create a new stakeholder
const create = async (stakeholder) => {
  const { name, contact, address, category } = stakeholder;
  const result = await pool.query(
    "INSERT INTO stakeholder (name, contact, address, category) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, contact, address, category]
  );
  return result.rows[0];
};

// Update a stakeholder
const update = async (id, stakeholder) => {
  const { name, contact, address, category } = stakeholder;
  const result = await pool.query(
    "UPDATE stakeholder SET name = $1, contact = $2, address = $3, category = $4 WHERE id = $5 RETURNING *",
    [name, contact, address, category, id]
  );
  return result.rows[0];
};

// Delete a stakeholder
const remove = async (id) => {
  await pool.query("DELETE FROM stakeholder WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

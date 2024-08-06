const { pool } = require("../config/db");

// Fetch all companies
const getAll = async () => {
  const result = await pool.query("SELECT * FROM companies");
  return result.rows;
};

// Fetch a company by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM companies WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

// Create a new company
const create = async (company) => {
  const { name, category, subcategory } = company;
  const result = await pool.query(
    "INSERT INTO companies (name, category, subcategory) VALUES ($1, $2, $3) RETURNING *",
    [name, category, subcategory]
  );
  return result.rows[0];
};

// Update a company
const update = async (id, company) => {
  const { name, category, subcategory } = company;
  const result = await pool.query(
    "UPDATE companies SET name = $1, category = $2, subcategory = $3 WHERE id = $4 RETURNING *",
    [name, category, subcategory, id]
  );
  return result.rows[0];
};

// Delete a company
const remove = async (id) => {
  await pool.query("DELETE FROM companies WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

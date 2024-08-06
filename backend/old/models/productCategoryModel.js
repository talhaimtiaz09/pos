const { pool } = require("../config/db");

// Fetch all product categories
const getAll = async () => {
  const result = await pool.query("SELECT * FROM product_categories");
  return result.rows;
};

// Fetch a product category by ID
const getById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM product_categories WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

// Create a new product category
const create = async (category) => {
  const { category_name } = category;
  const result = await pool.query(
    "INSERT INTO product_categories (category_name) VALUES ($1) RETURNING *",
    [category_name]
  );
  return result.rows[0];
};

// Update a product category
const update = async (id, category) => {
  const { category_name } = category;
  const result = await pool.query(
    "UPDATE product_categories SET category_name = $1 WHERE id = $2 RETURNING *",
    [category_name, id]
  );
  return result.rows[0];
};

// Delete a product category
const remove = async (id) => {
  await pool.query("DELETE FROM product_categories WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

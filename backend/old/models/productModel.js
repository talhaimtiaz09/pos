const { pool } = require("../config/db");

// Fetch all products
const getAll = async () => {
  const result = await pool.query("SELECT * FROM products");
  return result.rows;
};

// Fetch a product by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

// Create a new product
const create = async (product) => {
  const {
    name,
    category_id,
    sub_category_id,
    short_name,
    unit_id,
    supplier_id,
  } = product;
  const result = await pool.query(
    "INSERT INTO products (name, category_id, sub_category_id, short_name, unit_id, supplier_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, category_id, sub_category_id, short_name, unit_id, supplier_id]
  );
  return result.rows[0];
};

// Update a product
const update = async (id, product) => {
  const {
    name,
    category_id,
    sub_category_id,
    short_name,
    unit_id,
    supplier_id,
  } = product;
  const result = await pool.query(
    "UPDATE products SET name = $1, category_id = $2, sub_category_id = $3, short_name = $4, unit_id = $5, supplier_id = $6 WHERE id = $7 RETURNING *",
    [name, category_id, sub_category_id, short_name, unit_id, supplier_id, id]
  );
  return result.rows[0];
};

// Delete a product
const remove = async (id) => {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

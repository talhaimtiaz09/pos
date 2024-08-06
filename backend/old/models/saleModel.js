const { pool } = require("../config/db");

// Fetch all sales
const getAll = async () => {
  const result = await pool.query("SELECT * FROM sales");
  return result.rows;
};

// Fetch a sale by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM sales WHERE id = $1", [id]);
  return result.rows[0];
};

// Create a new sale
const create = async (sale) => {
  const {
    customer_id,
    product_id,
    quantity,
    account_id,
    price,
    discount,
    sale_type_id,
    stakeholder_id,
  } = sale;
  const result = await pool.query(
    "INSERT INTO sales (customer_id, product_id, quantity, account_id, price, discount, sale_type_id, stakeholder_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [
      customer_id,
      product_id,
      quantity,
      account_id,
      price,
      discount,
      sale_type_id,
      stakeholder_id,
    ]
  );
  return result.rows[0];
};

// Update a sale
const update = async (id, sale) => {
  const {
    customer_id,
    product_id,
    quantity,
    account_id,
    price,
    discount,
    sale_type_id,
    stakeholder_id,
  } = sale;
  const result = await pool.query(
    "UPDATE sales SET customer_id = $1, product_id = $2, quantity = $3, account_id = $4, price = $5, discount = $6, sale_type_id = $7, stakeholder_id = $8 WHERE id = $9 RETURNING *",
    [
      customer_id,
      product_id,
      quantity,
      account_id,
      price,
      discount,
      sale_type_id,
      stakeholder_id,
      id,
    ]
  );
  return result.rows[0];
};

// Delete a sale
const remove = async (id) => {
  await pool.query("DELETE FROM sales WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

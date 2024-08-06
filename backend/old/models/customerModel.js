const { pool } = require("../config/db");

// Fetch all customers
const getAll = async () => {
  console.log("getAll customers");
  const result = await pool.query("SELECT * FROM customers");
  return result.rows;
};

// Fetch a customer by ID
const getById = async (id) => {
  const result = await pool.query("SELECT * FROM customers WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

// Create a new customer
const create = async (customer) => {
  const { name, address, phone } = customer;
  const result = await pool.query(
    "INSERT INTO customers (name, address, phone) VALUES ($1, $2, $3) RETURNING *",
    [name, address, phone]
  );
  return result.rows[0];
};

// Update a customer
const update = async (id, customer) => {
  const { name, address, phone } = customer;
  const result = await pool.query(
    "UPDATE customers SET name = $1, address = $2, phone = $3 WHERE id = $4 RETURNING *",
    [name, address, phone, id]
  );
  return result.rows[0];
};

// Delete a customer
const remove = async (id) => {
  await pool.query("DELETE FROM customers WHERE id = $1", [id]);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

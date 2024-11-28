const { pool } = require("../../config/db");

// SQL Queries
const queries = {
  getAll: "SELECT * FROM customers ORDER BY name",
  getById: "SELECT * FROM customers WHERE id = $1",
  create:
    "INSERT INTO customers (name, address, phone) VALUES ($1, $2, $3) RETURNING *",
  update:
    "UPDATE customers SET name = $1, address = $2, phone = $3 WHERE id = $4 RETURNING *",
  remove: "DELETE FROM customers WHERE id = $1",
};

// Fetch all customers
const getAll = async () => {
  try {
    console.log("Fetching all customers");
    const result = await pool.query(queries.getAll);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all customers:", error);
    throw error;
  }
};

// Fetch a customer by ID
const getById = async (id) => {
  try {
    const result = await pool.query(queries.getById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching customer by ID (${id}):`, error);
    throw error;
  }
};

// Create a new customer
const create = async (customer) => {
  const { name, address, phone } = customer;

  console.log("Creating new customer with data from frontend :", customer);
  try {
    const result = await pool.query(queries.create, [name, address, phone]);
    return result.rows[0];
  } catch (error) {
    if (error.code === "23505") {
      // Handle unique constraint violation (assuming phone number is unique)
      return {
        code: "23505",
        message: "Customer already exists with this phone number",
      };
    }
    console.error("Error creating new customer:", error);
    throw error;
  }
};

// Update a customer
const update = async (id, customer) => {
  const { name, address, phone } = customer;
  try {
    const result = await pool.query(queries.update, [name, address, phone, id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating customer (${id}):`, error);
    throw error;
  }
};

// Delete a customer
const remove = async (id) => {
  try {
    await pool.query(queries.remove, [id]);
  } catch (error) {
    console.error(`Error deleting customer (${id}):`, error);
    throw error;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

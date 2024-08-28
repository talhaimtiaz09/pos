const { pool } = require("../../config/db");

// SQL Queries
const queries = {
  // Transaction queries
  createTransaction: `
    INSERT INTO transactions (amount, transaction_type, from_account_id, to_account_id)
    VALUES ($1, $2, $3, $4) RETURNING *`,

  getAllTransactions: `
    SELECT t.*, fa.name AS from_account_name, ta.name AS to_account_name
    FROM transactions t
    LEFT JOIN accounts fa ON t.from_account_id = fa.id
    LEFT JOIN accounts ta ON t.to_account_id = ta.id
    ORDER BY t.date DESC`,

  getTransactionById: `
    SELECT t.*, fa.name AS from_account_name, ta.name AS to_account_name
    FROM transactions t
    LEFT JOIN accounts fa ON t.from_account_id = fa.id
    LEFT JOIN accounts ta ON t.to_account_id = ta.id
    WHERE t.id = $1`,
};

// Transaction functions
const createTransaction = async (transaction) => {
  const { amount, transaction_type, from_account_id, to_account_id } =
    transaction;
  try {
    console.log("Creating new transaction");
    const result = await pool.query(queries.createTransaction, [
      amount,
      transaction_type,
      from_account_id,
      to_account_id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new transaction:", error);
    throw error;
  }
};

const getAllTransactions = async () => {
  try {
    console.log("Fetching all transactions");
    const result = await pool.query(queries.getAllTransactions);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all transactions:", error);
    throw error;
  }
};

const getTransactionById = async (id) => {
  try {
    console.log(`Fetching transaction by ID: ${id}`);
    const result = await pool.query(queries.getTransactionById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching transaction by ID (${id}):`, error);
    throw error;
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
};

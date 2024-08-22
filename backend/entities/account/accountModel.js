const { pool } = require("../../config/db");

// SQL Queries
const queries = {
  // Account queries
  getAllAccounts: `
    SELECT a.*, ac.name AS category_name, s.name AS owner_name
    FROM accounts a
    LEFT JOIN account_categories ac ON a.category = ac.id
    LEFT JOIN stakeholder s ON a.owner_id = s.id
    ORDER BY a.name`,
  getAccountById: `
    SELECT a.*, ac.name AS category_name, s.name AS owner_name
    FROM accounts a
    LEFT JOIN account_categories ac ON a.category = ac.id
    LEFT JOIN stakeholder s ON a.owner_id = s.id
    WHERE a.id = $1`,
  createAccount: `
    INSERT INTO accounts (name, category, min_limit, max_limit, balance, owner_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
  updateAccount: `
    UPDATE accounts
    SET name = $1, category = $2, min_limit = $3, max_limit = $4, balance = $5, owner_id = $6
    WHERE id = $7 RETURNING *`,
  removeAccount: "DELETE FROM accounts WHERE id = $1",

  // Account Category queries
  getAllAccountCategories: "SELECT * FROM account_categories ORDER BY name",
  getAccountCategoryById: "SELECT * FROM account_categories WHERE id = $1",
  createAccountCategory: `
    INSERT INTO account_categories (name) VALUES ($1) RETURNING *`,
  updateAccountCategory: `
    UPDATE account_categories SET name = $1 WHERE id = $2 RETURNING *`,
  removeAccountCategory: "DELETE FROM account_categories WHERE id = $1",
};

// Account functions
const getAllAccounts = async () => {
  try {
    console.log("Fetching all accounts");
    const result = await pool.query(queries.getAllAccounts);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all accounts:", error);
    throw error;
  }
};

const getAccountById = async (id) => {
  try {
    console.log(`Fetching account by ID: ${id}`);
    const result = await pool.query(queries.getAccountById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching account by ID (${id}):`, error);
    throw error;
  }
};

const createAccount = async (account) => {
  const { name, category, min_limit, max_limit, balance, owner_id } = account;
  try {
    console.log("Creating new account");
    const result = await pool.query(queries.createAccount, [
      name,
      category,
      min_limit,
      max_limit,
      balance,
      owner_id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new account:", error);
    throw error;
  }
};

const updateAccount = async (id, account) => {
  const { name, category, min_limit, max_limit, balance, owner_id } = account;
  try {
    console.log(`Updating account with ID: ${id}`);
    const result = await pool.query(queries.updateAccount, [
      name,
      category,
      min_limit,
      max_limit,
      balance,
      owner_id,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating account (${id}):`, error);
    throw error;
  }
};

const removeAccount = async (id) => {
  try {
    console.log(`Deleting account with ID: ${id}`);
    await pool.query(queries.removeAccount, [id]);
  } catch (error) {
    console.error(`Error deleting account (${id}):`, error);
    throw error;
  }
};

// Account Category functions
const getAllAccountCategories = async () => {
  try {
    console.log("Fetching all account categories");
    const result = await pool.query(queries.getAllAccountCategories);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all account categories:", error);
    throw error;
  }
};

const getAccountCategoryById = async (id) => {
  try {
    console.log(`Fetching account category by ID: ${id}`);
    const result = await pool.query(queries.getAccountCategoryById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching account category by ID (${id}):`, error);
    throw error;
  }
};

const createAccountCategory = async (name) => {
  try {
    console.log("Creating new account category");
    const result = await pool.query(queries.createAccountCategory, [name]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new account category:", error);
    throw error;
  }
};

const updateAccountCategory = async (id, name) => {
  try {
    console.log(`Updating account category with ID: ${id}`);
    const result = await pool.query(queries.updateAccountCategory, [name, id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating account category (${id}):`, error);
    throw error;
  }
};

const removeAccountCategory = async (id) => {
  try {
    console.log(`Deleting account category with ID: ${id}`);
    await pool.query(queries.removeAccountCategory, [id]);
  } catch (error) {
    console.error(`Error deleting account category (${id}):`, error);
    throw error;
  }
};

module.exports = {
  // Account functions
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  removeAccount,

  // Account Category functions
  getAllAccountCategories,
  getAccountCategoryById,
  createAccountCategory,
  updateAccountCategory,
  removeAccountCategory,
};

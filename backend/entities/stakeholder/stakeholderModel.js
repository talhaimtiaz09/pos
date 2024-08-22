const { pool } = require("../../config/db");

// SQL Queries
const queries = {
  // Stakeholder queries
  getAllStakeholders: `
    SELECT s.*, sc.name AS category_name
    FROM stakeholder s
    LEFT JOIN stakeholder_categories sc ON s.category = sc.id
    ORDER BY s.name`,
  getStakeholderById: `
    SELECT s.*, sc.name AS category_name
    FROM stakeholder s
    LEFT JOIN stakeholder_categories sc ON s.category = sc.id
    WHERE s.id = $1`,
  createStakeholder: `
    INSERT INTO stakeholder (name, contact, address, category)
    VALUES ($1, $2, $3, $4) RETURNING *`,
  updateStakeholder: `
    UPDATE stakeholder
    SET name = $1, contact = $2, address = $3, category = $4
    WHERE id = $5 RETURNING *`,
  removeStakeholder: "DELETE FROM stakeholder WHERE id = $1",

  // Stakeholder Category queries
  getAllStakeholderCategories:
    "SELECT * FROM stakeholder_categories ORDER BY name",
  getStakeholderCategoryById:
    "SELECT * FROM stakeholder_categories WHERE id = $1",
  createStakeholderCategory: `
    INSERT INTO stakeholder_categories (name) VALUES ($1) RETURNING *`,
  updateStakeholderCategory: `
    UPDATE stakeholder_categories SET name = $1 WHERE id = $2 RETURNING *`,
  removeStakeholderCategory: "DELETE FROM stakeholder_categories WHERE id = $1",
};

// Stakeholder functions
const getAllStakeholders = async () => {
  try {
    console.log("Fetching all stakeholders");
    const result = await pool.query(queries.getAllStakeholders);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all stakeholders:", error);
    throw error;
  }
};

const getStakeholderById = async (id) => {
  try {
    console.log(`Fetching stakeholder by ID: ${id}`);
    const result = await pool.query(queries.getStakeholderById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching stakeholder by ID (${id}):`, error);
    throw error;
  }
};

const createStakeholder = async (stakeholder) => {
  const { name, contact, address, category } = stakeholder;
  try {
    console.log("Creating new stakeholder");
    const result = await pool.query(queries.createStakeholder, [
      name,
      contact,
      address,
      category,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new stakeholder:", error);
    throw error;
  }
};

const updateStakeholder = async (id, stakeholder) => {
  const { name, contact, address, category } = stakeholder;
  try {
    console.log(`Updating stakeholder with ID: ${id}`);
    const result = await pool.query(queries.updateStakeholder, [
      name,
      contact,
      address,
      category,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating stakeholder (${id}):`, error);
    throw error;
  }
};

const removeStakeholder = async (id) => {
  try {
    console.log(`Deleting stakeholder with ID: ${id}`);
    await pool.query(queries.removeStakeholder, [id]);
  } catch (error) {
    console.error(`Error deleting stakeholder (${id}):`, error);
    throw error;
  }
};

// Stakeholder Category functions
const getAllStakeholderCategories = async () => {
  try {
    console.log("Fetching all stakeholder categories");
    const result = await pool.query(queries.getAllStakeholderCategories);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all stakeholder categories:", error);
    throw error;
  }
};

const getStakeholderCategoryById = async (id) => {
  try {
    console.log(`Fetching stakeholder category by ID: ${id}`);
    const result = await pool.query(queries.getStakeholderCategoryById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching stakeholder category by ID (${id}):`, error);
    throw error;
  }
};

const createStakeholderCategory = async (name) => {
  try {
    console.log("Creating new stakeholder category");
    const result = await pool.query(queries.createStakeholderCategory, [name]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new stakeholder category:", error);
    throw error;
  }
};

const updateStakeholderCategory = async (id, name) => {
  try {
    console.log(`Updating stakeholder category with ID: ${id}`);
    const result = await pool.query(queries.updateStakeholderCategory, [
      name,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating stakeholder category (${id}):`, error);
    throw error;
  }
};

const removeStakeholderCategory = async (id) => {
  try {
    console.log(`Deleting stakeholder category with ID: ${id}`);
    await pool.query(queries.removeStakeholderCategory, [id]);
  } catch (error) {
    console.error(`Error deleting stakeholder category (${id}):`, error);
    throw error;
  }
};

module.exports = {
  // Stakeholder functions
  getAllStakeholders,
  getStakeholderById,
  createStakeholder,
  updateStakeholder,
  removeStakeholder,

  // Stakeholder Category functions
  getAllStakeholderCategories,
  getStakeholderCategoryById,
  createStakeholderCategory,
  updateStakeholderCategory,
  removeStakeholderCategory,
};

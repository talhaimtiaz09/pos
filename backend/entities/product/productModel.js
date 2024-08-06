const { pool } = require("../../config/db");

// SQL Queries
const queries = {
  // Product queries
  getAllProducts: `
    SELECT p.*, pc.category_name, ps.subcategory_name, pu.name AS unit_name 
    FROM products p
    LEFT JOIN product_categories pc ON p.category_id = pc.id
    LEFT JOIN product_subcategories ps ON p.sub_category_id = ps.id
    LEFT JOIN product_units pu ON p.unit_id = pu.id
    ORDER BY p.name`,
  getProductById: `
    SELECT p.*, pc.category_name, ps.subcategory_name, pu.name AS unit_name 
    FROM products p
    LEFT JOIN product_categories pc ON p.category_id = pc.id
    LEFT JOIN product_subcategories ps ON p.sub_category_id = ps.id
    LEFT JOIN product_units pu ON p.unit_id = pu.id
    WHERE p.id = $1`,
  createProduct: `
    INSERT INTO products (name, category_id, sub_category_id, short_name, unit_id, supplier_id)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
  updateProduct: `
    UPDATE products
    SET name = $1, category_id = $2, sub_category_id = $3, short_name = $4, unit_id = $5, supplier_id = $6, update_date = NOW()
    WHERE id = $7 RETURNING *`,
  removeProduct: "DELETE FROM products WHERE id = $1",

  // Category queries
  getAllCategories: "SELECT * FROM product_categories ORDER BY category_name",
  getCategoryById: "SELECT * FROM product_categories WHERE id = $1",
  createCategory:
    "INSERT INTO product_categories (category_name) VALUES ($1) RETURNING *",
  updateCategory:
    "UPDATE product_categories SET category_name = $1 WHERE id = $2 RETURNING *",
  removeCategory: "DELETE FROM product_categories WHERE id = $1",

  // Subcategory queries
  getAllSubcategories: `
    SELECT ps.*, pc.category_name
    FROM product_subcategories ps
    LEFT JOIN product_categories pc ON ps.category_id = pc.id
    ORDER BY ps.subcategory_name`,
  getSubcategoryById: "SELECT * FROM product_subcategories WHERE id = $1",
  createSubcategory: `
    INSERT INTO product_subcategories (subcategory_name, category_id)
    VALUES ($1, $2) RETURNING *`,
  updateSubcategory: `
    UPDATE product_subcategories
    SET subcategory_name = $1
    WHERE id = $2 RETURNING *`,
  removeSubcategory: "DELETE FROM product_subcategories WHERE id = $1",

  // Unit queries
  getAllUnits: "SELECT * FROM product_units ORDER BY name",
  getUnitById: "SELECT * FROM product_units WHERE id = $1",
  createUnit: "INSERT INTO product_units (name) VALUES ($1) RETURNING *",
  updateUnit: "UPDATE product_units SET name = $1 WHERE id = $2 RETURNING *",
  removeUnit: "DELETE FROM product_units WHERE id = $1",
};

// Product functions
const getAllProducts = async () => {
  try {
    console.log("Fetching all products");
    const result = await pool.query(queries.getAllProducts);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const result = await pool.query(queries.getProductById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching product by ID (${id}):`, error);
    throw error;
  }
};

const createProduct = async (product) => {
  const {
    name,
    category_id,
    sub_category_id,
    short_name,
    unit_id,
    supplier_id,
  } = product;
  try {
    const result = await pool.query(queries.createProduct, [
      name,
      category_id,
      sub_category_id,
      short_name,
      unit_id,
      supplier_id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new product:", error);
    throw error;
  }
};

const updateProduct = async (id, product) => {
  const {
    name,
    category_id,
    sub_category_id,
    short_name,
    unit_id,
    supplier_id,
  } = product;
  try {
    const result = await pool.query(queries.updateProduct, [
      name,
      category_id,
      sub_category_id,
      short_name,
      unit_id,
      supplier_id,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating product (${id}):`, error);
    throw error;
  }
};

const removeProduct = async (id) => {
  try {
    await pool.query(queries.removeProduct, [id]);
  } catch (error) {
    console.error(`Error deleting product (${id}):`, error);
    throw error;
  }
};

// Category functions
const getAllCategories = async () => {
  try {
    const result = await pool.query(queries.getAllCategories);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const result = await pool.query(queries.getCategoryById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching category by ID (${id}):`, error);
    throw error;
  }
};

const createCategory = async (category_name) => {
  try {
    const result = await pool.query(queries.createCategory, [category_name]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new category:", error);
    throw error;
  }
};

const updateCategory = async (id, category_name) => {
  try {
    const result = await pool.query(queries.updateCategory, [
      category_name,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating category (${id}):`, error);
    throw error;
  }
};

const removeCategory = async (id) => {
  try {
    await pool.query(queries.removeCategory, [id]);
  } catch (error) {
    console.error(`Error deleting category (${id}):`, error);
    throw error;
  }
};

// Subcategory functions
const getAllSubcategories = async () => {
  try {
    const result = await pool.query(queries.getAllSubcategories);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all subcategories:", error);
    throw error;
  }
};

const getSubcategoryById = async (id) => {
  try {
    const result = await pool.query(queries.getSubcategoryById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching subcategory by ID (${id}):`, error);
    throw error;
  }
};

const createSubcategory = async (subcategory_name, category_id) => {
  try {
    const result = await pool.query(queries.createSubcategory, [
      subcategory_name,
      category_id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new subcategory:", error);
    throw error;
  }
};

const updateSubcategory = async (id, subcategory_name, category_id) => {
  try {
    const result = await pool.query(queries.updateSubcategory, [
      subcategory_name,
      //   category_id,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating subcategory (${id}):`, error);
    throw error;
  }
};

const removeSubcategory = async (id) => {
  try {
    await pool.query(queries.removeSubcategory, [id]);
  } catch (error) {
    console.error(`Error deleting subcategory (${id}):`, error);
    throw error;
  }
};

// Unit functions
const getAllUnits = async () => {
  try {
    const result = await pool.query(queries.getAllUnits);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all units:", error);
    throw error;
  }
};

const getUnitById = async (id) => {
  try {
    const result = await pool.query(queries.getUnitById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching unit by ID (${id}):`, error);
    throw error;
  }
};

const createUnit = async (name) => {
  try {
    const result = await pool.query(queries.createUnit, [name]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new unit:", error);
    throw error;
  }
};

const updateUnit = async (id, name) => {
  try {
    const result = await pool.query(queries.updateUnit, [name, id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating unit (${id}):`, error);
    throw error;
  }
};

const removeUnit = async (id) => {
  try {
    await pool.query(queries.removeUnit, [id]);
  } catch (error) {
    console.error(`Error deleting unit (${id}):`, error);
    throw error;
  }
};

module.exports = {
  // Product functions
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  removeProduct,

  // Category functions
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  removeCategory,

  // Subcategory functions
  getAllSubcategories,
  getSubcategoryById,
  createSubcategory,
  updateSubcategory,
  removeSubcategory,

  // Unit functions
  getAllUnits,
  getUnitById,
  createUnit,
  updateUnit,
  removeUnit,
};

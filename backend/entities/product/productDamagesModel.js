const { pool } = require("../../config/db");

// SQL Queries
const queries = {
  getAllDamages: `
    SELECT pd.*, p.name AS product_name
    FROM product_damages pd
    LEFT JOIN products p ON pd.product_id = p.id
    ORDER BY pd.damage_date DESC`,
  getDamageById: `
    SELECT pd.*, p.name AS product_name
    FROM product_damages pd
    LEFT JOIN products p ON pd.product_id = p.id
    WHERE pd.id = $1`,
  createDamage: `
    INSERT INTO product_damages (quantity, damage_date, product_id)
    VALUES ($1, $2, $3) RETURNING *`,
  updateDamage: `
    UPDATE product_damages
    SET quantity = $1, damage_date = $2, product_id = $3
    WHERE id = $4 RETURNING *`,
  removeDamage: "DELETE FROM product_damages WHERE id = $1",
};

// Model functions
const getAllDamages = async () => {
  try {
    const result = await pool.query(queries.getAllDamages);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all damages:", error);
    throw error;
  }
};

const getDamageById = async (id) => {
  try {
    const result = await pool.query(queries.getDamageById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching damage by ID (${id}):`, error);
    throw error;
  }
};

const createDamage = async (damage) => {
  const { quantity, damage_date, product_id } = damage;
  try {
    const result = await pool.query(queries.createDamage, [
      quantity,
      damage_date,
      product_id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new damage:", error);
    throw error;
  }
};

const updateDamage = async (id, damage) => {
  const { quantity, damage_date, product_id } = damage;
  try {
    const result = await pool.query(queries.updateDamage, [
      quantity,
      damage_date,
      product_id,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating damage (${id}):`, error);
    throw error;
  }
};

const removeDamage = async (id) => {
  try {
    await pool.query(queries.removeDamage, [id]);
  } catch (error) {
    console.error(`Error deleting damage (${id}):`, error);
    throw error;
  }
};

module.exports = {
  getAllDamages,
  getDamageById,
  createDamage,
  updateDamage,
  removeDamage,
};

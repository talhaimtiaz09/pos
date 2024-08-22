const { pool } = require("../../config/db");
const queries = {
  // Sales queries
  getAllSales: `
      SELECT s.*, c.customer_name, p.product_name, a.account_name, st.stakeholder_name
      FROM sales s
      LEFT JOIN customers c ON s.customer_id = c.id
      LEFT JOIN products p ON s.product_id = p.id
      LEFT JOIN accounts a ON s.account_id = a.id
      LEFT JOIN stakeholder st ON s.stakeholder_id = st.id
      ORDER BY s.date DESC`,
  getSaleById: `
      SELECT s.*, c.customer_name, p.product_name, a.account_name, st.stakeholder_name
      FROM sales s
      LEFT JOIN customers c ON s.customer_id = c.id
      LEFT JOIN products p ON s.product_id = p.id
      LEFT JOIN accounts a ON s.account_id = a.id
      LEFT JOIN stakeholder st ON s.stakeholder_id = st.id
      WHERE s.id = $1`,
  createSale: `
      INSERT INTO sales (date, customer_id, product_id, quantity, account_id, price, stakeholder_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
  updateSale: `
      UPDATE sales
      SET date = $1, customer_id = $2, product_id = $3, quantity = $4, account_id = $5, price = $6, stakeholder_id = $7
      WHERE id = $8 RETURNING *`,
  removeSale: "DELETE FROM sales WHERE id = $1",

  // Credit Sales queries
  getAllCreditSales: `
      SELECT cs.*, c.customer_name, s.date AS sale_date, s.price, s.quantity
      FROM credit_sales cs
      LEFT JOIN customers c ON cs.customer_id = c.id
      LEFT JOIN sales s ON cs.sale_id = s.id
      ORDER BY cs.date DESC`,
  getCreditSaleById: `
      SELECT cs.*, c.customer_name, s.date AS sale_date, s.price, s.quantity
      FROM credit_sales cs
      LEFT JOIN customers c ON cs.customer_id = c.id
      LEFT JOIN sales s ON cs.sale_id = s.id
      WHERE cs.id = $1`,
  createCreditSale: `
      INSERT INTO credit_sales (date, customer_id, sale_id, amount, is_pending)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  updateCreditSale: `
      UPDATE credit_sales
      SET date = $1, customer_id = $2, sale_id = $3, amount = $4, is_pending = $5
      WHERE id = $6 RETURNING *`,
  removeCreditSale: "DELETE FROM credit_sales WHERE id = $1",

  // Credit Payment queries
  getAllCreditPayments: `
      SELECT cp.*, cs.amount AS credit_amount, cs.date AS credit_sale_date, c.customer_name
      FROM credit_payment cp
      LEFT JOIN credit_sales cs ON cp.credit_sale_id = cs.id
      LEFT JOIN customers c ON cs.customer_id = c.id
      ORDER BY cp.payment_date DESC`,
  getCreditPaymentById: `
      SELECT cp.*, cs.amount AS credit_amount, cs.date AS credit_sale_date, c.customer_name
      FROM credit_payment cp
      LEFT JOIN credit_sales cs ON cp.credit_sale_id = cs.id
      LEFT JOIN customers c ON cs.customer_id = c.id
      WHERE cp.id = $1`,
  createCreditPayment: `
      INSERT INTO credit_payment (credit_sale_id, amount_paid, payment_date)
      VALUES ($1, $2, $3) RETURNING *`,
  updateCreditPayment: `
      UPDATE credit_payment
      SET credit_sale_id = $1, amount_paid = $2, payment_date = $3
      WHERE id = $4 RETURNING *`,
  removeCreditPayment: "DELETE FROM credit_payment WHERE id = $1",
};
// Credit Sales functions
const getAllCreditSales = async () => {
  try {
    console.log("Fetching all credit sales");
    const result = await pool.query(queries.getAllCreditSales);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all credit sales:", error);
    throw error;
  }
};

const getCreditSaleById = async (id) => {
  try {
    console.log(`Fetching credit sale by ID: ${id}`);
    const result = await pool.query(queries.getCreditSaleById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching credit sale by ID (${id}):`, error);
    throw error;
  }
};

const createCreditSale = async (creditSale) => {
  const { date, customer_id, sale_id, amount, is_pending } = creditSale;
  try {
    console.log("Creating new credit sale");
    const result = await pool.query(queries.createCreditSale, [
      date,
      customer_id,
      sale_id,
      amount,
      is_pending,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new credit sale:", error);
    throw error;
  }
};

const updateCreditSale = async (id, creditSale) => {
  const { date, customer_id, sale_id, amount, is_pending } = creditSale;
  try {
    console.log(`Updating credit sale with ID: ${id}`);
    const result = await pool.query(queries.updateCreditSale, [
      date,
      customer_id,
      sale_id,
      amount,
      is_pending,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating credit sale (${id}):`, error);
    throw error;
  }
};

const removeCreditSale = async (id) => {
  try {
    console.log(`Deleting credit sale with ID: ${id}`);
    await pool.query(queries.removeCreditSale, [id]);
  } catch (error) {
    console.error(`Error deleting credit sale (${id}):`, error);
    throw error;
  }
};

// Export the functions
module.exports = {
  getAllCreditSales,
  getCreditSaleById,
  createCreditSale,
  updateCreditSale,
  removeCreditSale,
};

const { pool } = require("../../config/db");
const queries = {
  // Sales queries
  getAllSales: `
        SELECT s.*, c.name AS customer_name, p.name AS product_name, a.name AS account_name, st.name AS stakeholder_name, pb.quantity AS batch_quantity
        FROM sales s
        LEFT JOIN customers c ON s.customer_id = c.id
        LEFT JOIN products p ON s.product_id = p.id
        LEFT JOIN accounts a ON s.account_id = a.id
        LEFT JOIN stakeholder st ON s.stakeholder_id = st.id
        LEFT JOIN product_batches pb ON s.batch_id = pb.id
        ORDER BY s.date DESC`,
  getSaleById: `
        SELECT s.*, c.name AS customer_name, p.name AS product_name, a.name AS account_name, st.name AS stakeholder_name, pb.quantity AS batch_quantity
        FROM sales s
        LEFT JOIN customers c ON s.customer_id = c.id
        LEFT JOIN products p ON s.product_id = p.id
        LEFT JOIN accounts a ON s.account_id = a.id
        LEFT JOIN stakeholder st ON s.stakeholder_id = st.id
        LEFT JOIN product_batches pb ON s.batch_id = pb.id
        WHERE s.id = $1`,
  createSale: `
        INSERT INTO sales (date, customer_id, product_id, quantity, account_id, price, stakeholder_id, batch_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
  updateSale: `
        UPDATE sales
        SET date = $1, customer_id = $2, product_id = $3, quantity = $4, account_id = $5, price = $6, stakeholder_id = $7, batch_id = $8
        WHERE id = $9 RETURNING *`,
  removeSale: "DELETE FROM sales WHERE id = $1",

  // Credit Sales queries
  getAllCreditSales: `
        SELECT cs.*, c.name AS customer_name, s.date AS sale_date, s.price, s.quantity, s.batch_id, pb.batch_number
        FROM credit_sales cs
        LEFT JOIN customers c ON cs.customer_id = c.id
        LEFT JOIN sales s ON cs.sale_id = s.id
        LEFT JOIN product_batches pb ON s.batch_id = pb.id
        ORDER BY cs.date DESC`,
  getCreditSaleById: `
        SELECT cs.*, c.name AS customer_name, s.date AS sale_date, s.price, s.quantity, s.batch_id, pb.batch_number
        FROM credit_sales cs
        LEFT JOIN customers c ON cs.customer_id = c.id
        LEFT JOIN sales s ON cs.sale_id = s.id
        LEFT JOIN product_batches pb ON s.batch_id = pb.id
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
        SELECT cp.*, cs.amount AS credit_amount, cs.date AS credit_sale_date, c.name AS customer_name, s.batch_id, pb.batch_number
        FROM credit_payment cp
        LEFT JOIN credit_sales cs ON cp.credit_sale_id = cs.id
        LEFT JOIN customers c ON cs.customer_id = c.id
        LEFT JOIN sales s ON cs.sale_id = s.id
        LEFT JOIN product_batches pb ON s.batch_id = pb.id
        ORDER BY cp.payment_date DESC`,
  getCreditPaymentById: `
        SELECT cp.*, cs.amount AS credit_amount, cs.date AS credit_sale_date, c.name AS customer_name, s.batch_id, pb.batch_number
        FROM credit_payment cp
        LEFT JOIN credit_sales cs ON cp.credit_sale_id = cs.id
        LEFT JOIN customers c ON cs.customer_id = c.id
        LEFT JOIN sales s ON cs.sale_id = s.id
        LEFT JOIN product_batches pb ON s.batch_id = pb.id
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

// Sales functions
const getAllSales = async () => {
  try {
    console.log("Fetching all sales");
    const result = await pool.query(queries.getAllSales);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all sales:", error);
    throw error;
  }
};

const getSaleById = async (id) => {
  try {
    console.log(`Fetching sale by ID: ${id}`);
    const result = await pool.query(queries.getSaleById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching sale by ID (${id}):`, error);
    throw error;
  }
};

const createSale = async (sale) => {
  const {
    date,
    customer_id,
    product_id,
    quantity,
    account_id,
    price,
    stakeholder_id,
    batch_id,
  } = sale;
  //   console.log(sale);
  try {
    console.log("Creating new sale");
    const result = await pool.query(queries.createSale, [
      date,
      customer_id,
      product_id,
      quantity,
      account_id,
      price,
      stakeholder_id,
      batch_id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new sale:", error);
    throw error;
  }
};

const updateSale = async (id, sale) => {
  const {
    date,
    customer_id,
    product_id,
    quantity,
    account_id,
    price,
    stakeholder_id,
  } = sale;
  try {
    console.log(`Updating sale with ID: ${id}`);
    const result = await pool.query(queries.updateSale, [
      date,
      customer_id,
      product_id,
      quantity,
      account_id,
      price,
      stakeholder_id,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating sale (${id}):`, error);
    throw error;
  }
};

const removeSale = async (id) => {
  try {
    console.log(`Deleting sale with ID: ${id}`);
    await pool.query(queries.removeSale, [id]);
  } catch (error) {
    console.error(`Error deleting sale (${id}):`, error);
    throw error;
  }
};

// Export the functions
module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  removeSale,
};

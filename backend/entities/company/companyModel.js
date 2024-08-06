const { pool } = require("../../config/db");

// SQL Queries
const queries = {
  // Company queries
  getAllCompanies: `
    SELECT c.*, pc.category_name, ps.subcategory_name 
    FROM companies c
    LEFT JOIN product_categories pc ON c.category = pc.id
    LEFT JOIN product_subcategories ps ON c.subcategory = ps.id
    ORDER BY c.name`,
  getCompanyById: `
    SELECT c.*, pc.category_name, ps.subcategory_name 
    FROM companies c
    LEFT JOIN product_categories pc ON c.category = pc.id
    LEFT JOIN product_subcategories ps ON c.subcategory = ps.id
    WHERE c.id = $1`,
  createCompany: `
    INSERT INTO companies (name, category, subcategory)
    VALUES ($1, $2, $3) RETURNING *`,
  updateCompany: `
    UPDATE companies
    SET name = $1, category = $2, subcategory = $3
    WHERE id = $4 RETURNING *`,
  removeCompany: "DELETE FROM companies WHERE id = $1",

  // Company bookings queries
  getAllBookings: `
    SELECT cb.*, c.name AS company_name, p.name AS product_name
    FROM company_bookings cb
    LEFT JOIN companies c ON cb.company_id = c.id
    LEFT JOIN products p ON cb.product_id = p.id
    ORDER BY cb.booking_date DESC`,
  getBookingById: `
    SELECT cb.*, c.name AS company_name, p.name AS product_name
    FROM company_bookings cb
    LEFT JOIN companies c ON cb.company_id = c.id
    LEFT JOIN products p ON cb.product_id = p.id
    WHERE cb.id = $1`,
  createBooking: `
    INSERT INTO company_bookings (company_id, amount, quantity, product_id, booking_date)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  updateBooking: `
    UPDATE company_bookings
    SET company_id = $1, amount = $2, quantity = $3, product_id = $4, booking_date = $5
    WHERE id = $6 RETURNING *`,
  removeBooking: "DELETE FROM company_bookings WHERE id = $1",

  // Company sales representatives queries
  getAllSalesReps: `
    SELECT csr.*, c.name AS company_name
    FROM company_sales_reps csr
    LEFT JOIN companies c ON csr.company_id = c.id
    ORDER BY csr.name`,
  getSalesRepById: `
    SELECT csr.*, c.name AS company_name
    FROM company_sales_reps csr
    LEFT JOIN companies c ON csr.company_id = c.id
    WHERE csr.id = $1`,
  createSalesRep: `
    INSERT INTO company_sales_reps (name, contact, address, company_id)
    VALUES ($1, $2, $3, $4) RETURNING *`,
  updateSalesRep: `
    UPDATE company_sales_reps
    SET name = $1, contact = $2, address = $3, company_id = $4
    WHERE id = $5 RETURNING *`,
  removeSalesRep: "DELETE FROM company_sales_reps WHERE id = $1",
};

// Company functions
const getAllCompanies = async () => {
  try {
    console.log("Fetching all companies");
    const result = await pool.query(queries.getAllCompanies);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all companies:", error);
    throw error;
  }
};

const getCompanyById = async (id) => {
  try {
    const result = await pool.query(queries.getCompanyById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching company by ID (${id}):`, error);
    throw error;
  }
};

const createCompany = async (company) => {
  const { name, category, subcategory } = company;
  try {
    const result = await pool.query(queries.createCompany, [
      name,
      category,
      subcategory,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new company:", error);
    throw error;
  }
};

const updateCompany = async (id, company) => {
  const { name, category, subcategory } = company;
  try {
    const result = await pool.query(queries.updateCompany, [
      name,
      category,
      subcategory,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating company (${id}):`, error);
    throw error;
  }
};

const removeCompany = async (id) => {
  try {
    await pool.query(queries.removeCompany, [id]);
  } catch (error) {
    console.error(`Error deleting company (${id}):`, error);
    throw error;
  }
};

// Booking functions
const getAllBookings = async () => {
  try {
    console.log("Fetching all bookings");
    const result = await pool.query(queries.getAllBookings);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    throw error;
  }
};

const getBookingById = async (id) => {
  try {
    const result = await pool.query(queries.getBookingById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching booking by ID (${id}):`, error);
    throw error;
  }
};

const createBooking = async (booking) => {
  const { company_id, amount, quantity, product_id, booking_date } = booking;
  try {
    const result = await pool.query(queries.createBooking, [
      company_id,
      amount,
      quantity,
      product_id,
      booking_date || new Date(),
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new booking:", error);
    throw error;
  }
};

const updateBooking = async (id, booking) => {
  const { company_id, amount, quantity, product_id, booking_date } = booking;
  try {
    const result = await pool.query(queries.updateBooking, [
      company_id,
      amount,
      quantity,
      product_id,
      booking_date || new Date(),
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating booking (${id}):`, error);
    throw error;
  }
};

const removeBooking = async (id) => {
  try {
    await pool.query(queries.removeBooking, [id]);
  } catch (error) {
    console.error(`Error deleting booking (${id}):`, error);
    throw error;
  }
};

// Sales Representative functions
const getAllSalesReps = async () => {
  try {
    console.log("Fetching all sales representatives");
    const result = await pool.query(queries.getAllSalesReps);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all sales representatives:", error);
    throw error;
  }
};

const getSalesRepById = async (id) => {
  try {
    const result = await pool.query(queries.getSalesRepById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching sales representative by ID (${id}):`, error);
    throw error;
  }
};

const createSalesRep = async (salesRep) => {
  const { name, contact, address, company_id } = salesRep;
  try {
    const result = await pool.query(queries.createSalesRep, [
      name,
      contact,
      address,
      company_id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new sales representative:", error);
    throw error;
  }
};

const updateSalesRep = async (id, salesRep) => {
  const { name, contact, address, company_id } = salesRep;
  try {
    const result = await pool.query(queries.updateSalesRep, [
      name,
      contact,
      address,
      company_id,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating sales representative (${id}):`, error);
    throw error;
  }
};

const removeSalesRep = async (id) => {
  try {
    await pool.query(queries.removeSalesRep, [id]);
  } catch (error) {
    console.error(`Error deleting sales representative (${id}):`, error);
    throw error;
  }
};

module.exports = {
  // Company functions
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  removeCompany,

  // Booking functions
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  removeBooking,

  // Sales Representative functions
  getAllSalesReps,
  getSalesRepById,
  createSalesRep,
  updateSalesRep,
  removeSalesRep,
};

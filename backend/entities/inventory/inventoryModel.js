const { pool } = require("../../config/db");

// SQL Queries
const queries = {
  // Batch Details queries
  getAllBatchDetails: "SELECT * FROM batch_details ORDER BY batch_number",
  getBatchDetailById: "SELECT * FROM batch_details WHERE id = $1",
  createBatchDetail: `
      INSERT INTO batch_details (batch_id, batch_number, manufacture_date, expiry_date)
      VALUES ($1, $2, $3, $4) RETURNING *`,
  updateBatchDetail: `
      UPDATE batch_details
      SET batch_id = $1, batch_number = $2, manufacture_date = $3, expiry_date = $4
      WHERE id = $5 RETURNING *`,
  removeBatchDetail: "DELETE FROM batch_details WHERE id = $1",

  // Inventory queries
  getAllInventories: "SELECT * FROM inventory ORDER BY inventory_name",
  getInventoryById: "SELECT * FROM inventory WHERE id = $1",
  createInventory:
    "INSERT INTO inventory (inventory_name) VALUES ($1) RETURNING *",
  updateInventory:
    "UPDATE inventory SET inventory_name = $1 WHERE id = $2 RETURNING *",
  removeInventory: "DELETE FROM inventory WHERE id = $1",

  // Product Batches queries
  getAllProductBatches: `
      SELECT pb.*, bd.batch_number, i.inventory_name 
      FROM product_batches pb
      LEFT JOIN batch_details bd ON pb.id = bd.batch_id
      LEFT JOIN inventory i ON pb.inventory_id = i.id
      ORDER BY pb.id`,
  getProductBatchById: `
      SELECT pb.*, bd.batch_number, i.inventory_name 
      FROM product_batches pb
      LEFT JOIN batch_details bd ON pb.id = bd.batch_id
      LEFT JOIN inventory i ON pb.inventory_id = i.id
      WHERE pb.id = $1`,
  createProductBatch: `
      INSERT INTO product_batches (quantity, product_id, purchase_price, is_active, inventory_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  updateProductBatch: `
      UPDATE product_batches
      SET quantity = $1, product_id = $2, purchase_price = $3, is_active = $4, inventory_id = $5
      WHERE id = $6 RETURNING *`,
  removeProductBatch: "DELETE FROM product_batches WHERE id = $1",

  // Inventory Records queries
  getAllInventoryRecords: `
      SELECT ir.*, bd.batch_number, i.inventory_name
      FROM inventory_records ir
      LEFT JOIN product_batches pb ON ir.batch_id = pb.id
      LEFT JOIN batch_details bd ON pb.id = bd.batch_id
      LEFT JOIN inventory i ON ir.inventory_id = i.id
      ORDER BY ir.record_date DESC`,
  getInventoryRecordById: `
      SELECT ir.*, bd.batch_number, i.inventory_name
      FROM inventory_records ir
      LEFT JOIN product_batches pb ON ir.batch_id = pb.id
      LEFT JOIN batch_details bd ON pb.id = bd.batch_id
      LEFT JOIN inventory i ON ir.inventory_id = i.id
      WHERE ir.id = $1`,
  createInventoryRecord: `
      INSERT INTO inventory_records (batch_id, quantity, record_type, record_date, inventory_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
  updateInventoryRecord: `
      UPDATE inventory_records
      SET batch_id = $1, quantity = $2, record_type = $3, record_date = $4, inventory_id = $5
      WHERE id = $6 RETURNING *`,
  removeInventoryRecord: "DELETE FROM inventory_records WHERE id = $1",

  // Inventory Locations queries
  // getAllInventoryLocations:
  //   "SELECT * FROM inventory_locations ORDER BY location_name",
  // getInventoryLocationById: "SELECT * FROM inventory_locations WHERE id = $1",
  // createInventoryLocation:
  //   "INSERT INTO inventory_locations (location_name) VALUES ($1) RETURNING *",
  // updateInventoryLocation:
  //   "UPDATE inventory_locations SET location_name = $1 WHERE id = $2 RETURNING *",
  // removeInventoryLocation: "DELETE FROM inventory_locations WHERE id = $1",

  // Stock queries
  getAllStock: "SELECT * FROM stock ORDER BY product_id",
  getStockById: "SELECT * FROM stock WHERE id = $1",
  createStock:
    "INSERT INTO stock (product_id, current_stock, min_limit) VALUES ($1, $2, $3) RETURNING *",
  updateStock:
    "UPDATE stock SET product_id = $1, current_stock = $2, min_limit = $3 WHERE id = $4 RETURNING *",
  removeStock: "DELETE FROM stock WHERE id = $1",
};

// Batch Details functions
const getAllBatchDetails = async () => {
  try {
    console.log("Fetching all batch details");
    const result = await pool.query(queries.getAllBatchDetails);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all batch details:", error);
    throw error;
  }
};

const getBatchDetailById = async (id) => {
  try {
    console.log(`Fetching batch detail by ID: ${id}`);
    const result = await pool.query(queries.getBatchDetailById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching batch detail by ID (${id}):`, error);
    throw error;
  }
};

const createBatchDetail = async (batchDetail) => {
  const { batch_id, batch_number, manufacture_date, expiry_date } = batchDetail;
  try {
    console.log("Creating new batch detail");
    const result = await pool.query(queries.createBatchDetail, [
      batch_id,
      batch_number,
      manufacture_date,
      expiry_date,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new batch detail:", error);
    throw error;
  }
};

const updateBatchDetail = async (id, batchDetail) => {
  const { batch_id, batch_number, manufacture_date, expiry_date } = batchDetail;
  try {
    console.log(`Updating batch detail with ID: ${id}`);
    const result = await pool.query(queries.updateBatchDetail, [
      batch_id,
      batch_number,
      manufacture_date,
      expiry_date,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating batch detail (${id}):`, error);
    throw error;
  }
};

const removeBatchDetail = async (id) => {
  try {
    console.log(`Deleting batch detail with ID: ${id}`);
    await pool.query(queries.removeBatchDetail, [id]);
  } catch (error) {
    console.error(`Error deleting batch detail (${id}):`, error);
    throw error;
  }
};

// Product Batches functions
const getAllProductBatches = async () => {
  try {
    console.log("Fetching all product batches");
    const result = await pool.query(queries.getAllProductBatches);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all product batches:", error);
    throw error;
  }
};

const getProductBatchById = async (id) => {
  try {
    console.log(`Fetching product batch by ID: ${id}`);
    const result = await pool.query(queries.getProductBatchById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching product batch by ID (${id}):`, error);
    throw error;
  }
};

const createProductBatch = async (productBatch) => {
  const {
    quantity,
    product_id,
    purchase_price,
    is_active,
    // // location_id,
    inventory_id,
  } = productBatch;
  try {
    console.log("Creating new product batch");
    const result = await pool.query(queries.createProductBatch, [
      quantity,
      product_id,
      purchase_price,
      is_active,
      // // location_id,
      inventory_id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new product batch:", error);
    throw error;
  }
};

const updateProductBatch = async (id, productBatch) => {
  const {
    quantity,
    product_id,
    purchase_price,
    is_active,
    // location_id,
    inventory_id,
  } = productBatch;
  try {
    console.log(`Updating product batch with ID: ${id}`);
    const result = await pool.query(queries.updateProductBatch, [
      quantity,
      product_id,
      purchase_price,
      is_active,
      // location_id,
      inventory_id,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating product batch (${id}):`, error);
    throw error;
  }
};

const removeProductBatch = async (id) => {
  try {
    console.log(`Deleting product batch with ID: ${id}`);
    await pool.query(queries.removeProductBatch, [id]);
  } catch (error) {
    console.error(`Error deleting product batch (${id}):`, error);
    throw error;
  }
};

// Inventory functions
const getAllInventories = async () => {
  try {
    console.log("Fetching all inventories");
    const result = await pool.query(queries.getAllInventories);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all inventories:", error);
    throw error;
  }
};

const getInventoryById = async (id) => {
  try {
    console.log(`Fetching inventory by ID: ${id}`);
    const result = await pool.query(queries.getInventoryById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching inventory by ID (${id}):`, error);
    throw error;
  }
};

const createInventory = async (inventory) => {
  const { inventory_name } = inventory;
  try {
    console.log("Creating new inventory");
    const result = await pool.query(queries.createInventory, [inventory_name]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new inventory:", error);
    throw error;
  }
};

const updateInventory = async (id, inventory) => {
  const { inventory_name } = inventory;
  try {
    console.log(`Updating inventory with ID: ${id}`);
    const result = await pool.query(queries.updateInventory, [
      inventory_name,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating inventory (${id}):`, error);
    throw error;
  }
};

const removeInventory = async (id) => {
  try {
    console.log(`Deleting inventory with ID: ${id}`);
    await pool.query(queries.removeInventory, [id]);
  } catch (error) {
    console.error(`Error deleting inventory (${id}):`, error);
    throw error;
  }
};

// Inventory Records functions
const getAllInventoryRecords = async () => {
  try {
    console.log("Fetching all inventory records");
    const result = await pool.query(queries.getAllInventoryRecords);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all inventory records:", error);
    throw error;
  }
};

const getInventoryRecordById = async (id) => {
  try {
    console.log(`Fetching inventory record by ID: ${id}`);
    const result = await pool.query(queries.getInventoryRecordById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching inventory record by ID (${id}):`, error);
    throw error;
  }
};

const createInventoryRecord = async (inventoryRecord) => {
  const { batch_id, quantity, record_type, record_date } = inventoryRecord;
  try {
    console.log("Creating new inventory record");
    const result = await pool.query(queries.createInventoryRecord, [
      batch_id,
      quantity,
      record_type,
      record_date,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new inventory record:", error);
    throw error;
  }
};

const updateInventoryRecord = async (id, inventoryRecord) => {
  const { batch_id, quantity, record_type, record_date } = inventoryRecord;
  try {
    console.log(`Updating inventory record with ID: ${id}`);
    const result = await pool.query(queries.updateInventoryRecord, [
      batch_id,
      quantity,
      record_type,
      record_date,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating inventory record (${id}):`, error);
    throw error;
  }
};

const removeInventoryRecord = async (id) => {
  try {
    console.log(`Deleting inventory record with ID: ${id}`);
    await pool.query(queries.removeInventoryRecord, [id]);
  } catch (error) {
    console.error(`Error deleting inventory record (${id}):`, error);
    throw error;
  }
};

// Inventory Locations functions
// const getAllInventoryLocations = async () => {
//   try {
//     console.log("Fetching all inventory locations");
//     const result = await pool.query(queries.getAllInventoryLocations);
//     return result.rows;
//   } catch (error) {
//     console.error("Error fetching all inventory locations:", error);
//     throw error;
//   }
// };

// const getInventoryLocationById = async (id) => {
//   try {
//     console.log(`Fetching inventory location by ID: ${id}`);
//     const result = await pool.query(queries.getInventoryLocationById, [id]);
//     return result.rows[0];
//   } catch (error) {
//     console.error(`Error fetching inventory location by ID (${id}):`, error);
//     throw error;
//   }
// };

// const createInventoryLocation = async (inventoryLocation) => {
//   const { location_name } = inventoryLocation;
//   try {
//     console.log("Creating new inventory location");
//     const result = await pool.query(queries.createInventoryLocation, [
//       location_name,
//     ]);
//     return result.rows[0];
//   } catch (error) {
//     console.error("Error creating new inventory location:", error);
//     throw error;
//   }
// };

// const updateInventoryLocation = async (id, inventoryLocation) => {
//   const { location_name } = inventoryLocation;
//   try {
//     console.log(`Updating inventory location with ID: ${id}`);
//     const result = await pool.query(queries.updateInventoryLocation, [
//       location_name,
//       id,
//     ]);
//     return result.rows[0];
//   } catch (error) {
//     console.error(`Error updating inventory location (${id}):`, error);
//     throw error;
//   }
// };

// const removeInventoryLocation = async (id) => {
//   try {
//     console.log(`Deleting inventory location with ID: ${id}`);
//     await pool.query(queries.removeInventoryLocation, [id]);
//   } catch (error) {
//     console.error(`Error deleting inventory location (${id}):`, error);
//     throw error;
//   }
// };

// Stock functions
const getAllStock = async () => {
  try {
    console.log("Fetching all stock");
    const result = await pool.query(queries.getAllStock);
    return result.rows;
  } catch (error) {
    console.error("Error fetching all stock:", error);
    throw error;
  }
};

const getStockById = async (id) => {
  try {
    console.log(`Fetching stock by ID: ${id}`);
    const result = await pool.query(queries.getStockById, [id]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching stock by ID (${id}):`, error);
    throw error;
  }
};

const createStock = async (stock) => {
  const { product_id, current_stock, min_limit } = stock;
  try {
    console.log("Creating new stock");
    const result = await pool.query(queries.createStock, [
      product_id,
      current_stock,
      min_limit,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating new stock:", error);
    throw error;
  }
};

const updateStock = async (id, stock) => {
  const { product_id, current_stock, min_limit } = stock;
  try {
    console.log(`Updating stock with ID: ${id}`);
    const result = await pool.query(queries.updateStock, [
      product_id,
      current_stock,
      min_limit,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating stock (${id}):`, error);
    throw error;
  }
};

const removeStock = async (id) => {
  try {
    console.log(`Deleting stock with ID: ${id}`);
    await pool.query(queries.removeStock, [id]);
  } catch (error) {
    console.error(`Error deleting stock (${id}):`, error);
    throw error;
  }
};

module.exports = {
  // Batch Details functions
  getAllBatchDetails,
  getBatchDetailById,
  createBatchDetail,
  updateBatchDetail,
  removeBatchDetail,

  // Inventory functions
  getAllInventories,
  getInventoryById,
  createInventory,
  updateInventory,
  removeInventory,

  // Product Batches functions
  getAllProductBatches,
  getProductBatchById,
  createProductBatch,
  updateProductBatch,
  removeProductBatch,

  // Inventory Records functions
  getAllInventoryRecords,
  getInventoryRecordById,
  createInventoryRecord,
  updateInventoryRecord,
  removeInventoryRecord,

  // // Inventory Locations functions
  // getAllInventoryLocations,
  // getInventoryLocationById,
  // createInventoryLocation,
  // updateInventoryLocation,
  // removeInventoryLocation,

  // Stock functions
  getAllStock,
  getStockById,
  createStock,
  updateStock,
  removeStock,
};

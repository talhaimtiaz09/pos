const inventoryModel = require("./inventoryModel");

// Inventory Controllers
const renderAllInventories = async (req, res) => {
  try {
    console.log("Controller: Fetching all inventories");
    const inventories = await inventoryModel.getAllInventories();
    res
      .status(200)
      .json({ data: inventories, message: "All inventories fetched" });
  } catch (error) {
    console.error("Controller: Error fetching all inventories:", error);
    res.status(500).json({ message: "Error fetching all inventories" });
  }
};

const renderInventoryById = async (req, res) => {
  try {
    console.log(`Controller: Fetching inventory by ID: ${req.params.id}`);
    const inventory = await inventoryModel.getInventoryById(req.params.id);
    if (!inventory)
      return res.status(404).json({ message: "Inventory not found" });
    res
      .status(200)
      .json({ data: inventory, message: "Inventory fetched by ID" });
  } catch (error) {
    console.error(
      `Controller: Error fetching inventory by ID (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error fetching inventory by ID" });
  }
};

const createNewInventory = async (req, res) => {
  try {
    console.log("Controller: Creating new inventory");
    const inventory = await inventoryModel.createInventory(req.body);
    res.status(201).json({ data: inventory, message: "New inventory created" });
  } catch (error) {
    console.error("Controller: Error creating new inventory:", error);
    res.status(500).json({ message: "Error creating new inventory" });
  }
};

const updateInventory = async (req, res) => {
  try {
    console.log(`Controller: Updating inventory with ID: ${req.params.id}`);
    const inventory = await inventoryModel.updateInventory(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .json({ data: inventory, message: "Inventory updated successfully" });
  } catch (error) {
    console.error(
      `Controller: Error updating inventory (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error updating inventory" });
  }
};

const deleteInventory = async (req, res) => {
  try {
    console.log(`Controller: Deleting inventory with ID: ${req.params.id}`);
    await inventoryModel.removeInventory(req.params.id);
    res.status(200).json({ message: "Inventory deleted successfully" });
  } catch (error) {
    console.error(
      `Controller: Error deleting inventory (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error deleting inventory" });
  }
};

// Batch Details Controllers
const renderAllBatchDetails = async (req, res) => {
  try {
    console.log("Controller: Fetching all batch details");
    const batchDetails = await inventoryModel.getAllBatchDetails();
    res
      .status(200)
      .json({ data: batchDetails, message: "All batch details fetched" });
  } catch (error) {
    console.error("Controller: Error fetching all batch details:", error);
    res.status(500).json({ message: "Error fetching all batch details" });
  }
};

const renderBatchDetailById = async (req, res) => {
  try {
    console.log(`Controller: Fetching batch detail by ID: ${req.params.id}`);
    const batchDetail = await inventoryModel.getBatchDetailById(req.params.id);
    if (!batchDetail)
      return res.status(404).json({ message: "Batch detail not found" });
    res
      .status(200)
      .json({ data: batchDetail, message: "Batch detail fetched by ID" });
  } catch (error) {
    console.error(
      `Controller: Error fetching batch detail by ID (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error fetching batch detail by ID" });
  }
};

const createNewBatchDetail = async (req, res) => {
  try {
    console.log("Controller: Creating new batch detail");
    const batchDetail = await inventoryModel.createBatchDetail(req.body);
    res
      .status(201)
      .json({ data: batchDetail, message: "New batch detail created" });
  } catch (error) {
    console.error("Controller: Error creating new batch detail:", error);
    res.status(500).json({ message: "Error creating new batch detail" });
  }
};

const updateBatchDetail = async (req, res) => {
  try {
    console.log(`Controller: Updating batch detail with ID: ${req.params.id}`);
    const batchDetail = await inventoryModel.updateBatchDetail(
      req.params.id,
      req.body
    );
    res.status(200).json({
      data: batchDetail,
      message: "Batch detail updated successfully",
    });
  } catch (error) {
    console.error(
      `Controller: Error updating batch detail (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error updating batch detail" });
  }
};

const deleteBatchDetail = async (req, res) => {
  try {
    console.log(`Controller: Deleting batch detail with ID: ${req.params.id}`);
    await inventoryModel.removeBatchDetail(req.params.id);
    res.status(200).json({ message: "Batch detail deleted successfully" });
  } catch (error) {
    console.error(
      `Controller: Error deleting batch detail (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error deleting batch detail" });
  }
};

// Product Batches Controllers
const renderAllProductBatches = async (req, res) => {
  try {
    console.log("Controller: Fetching all product batches");
    const productBatches = await inventoryModel.getAllProductBatches();
    res
      .status(200)
      .json({ data: productBatches, message: "All product batches fetched" });
  } catch (error) {
    console.error("Controller: Error fetching all product batches:", error);
    res.status(500).json({ message: "Error fetching all product batches" });
  }
};

const renderProductBatchById = async (req, res) => {
  try {
    console.log(`Controller: Fetching product batch by ID: ${req.params.id}`);
    const productBatch = await inventoryModel.getProductBatchById(
      req.params.id
    );
    if (!productBatch)
      return res.status(404).json({ message: "Product batch not found" });
    res
      .status(200)
      .json({ data: productBatch, message: "Product batch fetched by ID" });
  } catch (error) {
    console.error(
      `Controller: Error fetching product batch by ID (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error fetching product batch by ID" });
  }
};

const createNewProductBatch = async (req, res) => {
  try {
    console.log("Controller: Creating new product batch");
    const productBatch = await inventoryModel.createProductBatch(req.body);
    res
      .status(201)
      .json({ data: productBatch, message: "New product batch created" });
  } catch (error) {
    console.error("Controller: Error creating new product batch:", error);
    res.status(500).json({ message: "Error creating new product batch" });
  }
};

const updateProductBatch = async (req, res) => {
  try {
    console.log(`Controller: Updating product batch with ID: ${req.params.id}`);
    const productBatch = await inventoryModel.updateProductBatch(
      req.params.id,
      req.body
    );
    res.status(200).json({
      data: productBatch,
      message: "Product batch updated successfully",
    });
  } catch (error) {
    console.error(
      `Controller: Error updating product batch (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error updating product batch" });
  }
};

const deleteProductBatch = async (req, res) => {
  try {
    console.log(`Controller: Deleting product batch with ID: ${req.params.id}`);
    await inventoryModel.removeProductBatch(req.params.id);
    res.status(200).json({ message: "Product batch deleted successfully" });
  } catch (error) {
    console.error(
      `Controller: Error deleting product batch (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error deleting product batch" });
  }
};

// Inventory Records Controllers
const renderAllInventoryRecords = async (req, res) => {
  try {
    console.log("Controller: Fetching all inventory records");
    const inventoryRecords = await inventoryModel.getAllInventoryRecords();
    res.status(200).json({
      data: inventoryRecords,
      message: "All inventory records fetched",
    });
  } catch (error) {
    console.error("Controller: Error fetching all inventory records:", error);
    res.status(500).json({ message: "Error fetching all inventory records" });
  }
};

const renderInventoryRecordById = async (req, res) => {
  try {
    console.log(
      `Controller: Fetching inventory record by ID: ${req.params.id}`
    );
    const inventoryRecord = await inventoryModel.getInventoryRecordById(
      req.params.id
    );
    if (!inventoryRecord)
      return res.status(404).json({ message: "Inventory record not found" });
    res.status(200).json({
      data: inventoryRecord,
      message: "Inventory record fetched by ID",
    });
  } catch (error) {
    console.error(
      `Controller: Error fetching inventory record by ID (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error fetching inventory record by ID" });
  }
};

const createNewInventoryRecord = async (req, res) => {
  try {
    console.log("Controller: Creating new inventory record");
    const inventoryRecord = await inventoryModel.createInventoryRecord(
      req.body
    );
    res
      .status(201)
      .json({ data: inventoryRecord, message: "New inventory record created" });
  } catch (error) {
    console.error("Controller: Error creating new inventory record:", error);
    res.status(500).json({ message: "Error creating new inventory record" });
  }
};

const updateInventoryRecord = async (req, res) => {
  try {
    console.log(
      `Controller: Updating inventory record with ID: ${req.params.id}`
    );
    const inventoryRecord = await inventoryModel.updateInventoryRecord(
      req.params.id,
      req.body
    );
    res.status(200).json({
      data: inventoryRecord,
      message: "Inventory record updated successfully",
    });
  } catch (error) {
    console.error(
      `Controller: Error updating inventory record (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error updating inventory record" });
  }
};

const deleteInventoryRecord = async (req, res) => {
  try {
    console.log(
      `Controller: Deleting inventory record with ID: ${req.params.id}`
    );
    await inventoryModel.removeInventoryRecord(req.params.id);
    res.status(200).json({ message: "Inventory record deleted successfully" });
  } catch (error) {
    console.error(
      `Controller: Error deleting inventory record (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error deleting inventory record" });
  }
};

// Inventory Locations Controllers
// const renderAllInventoryLocations = async (req, res) => {
//   try {
//     console.log("Controller: Fetching all inventory locations");
//     const inventoryLocations = await inventoryModel.getAllInventoryLocations();
//     res.status(200).json({
//       data: inventoryLocations,
//       message: "All inventory locations fetched",
//     });
//   } catch (error) {
//     console.error("Controller: Error fetching all inventory locations:", error);
//     res.status(500).json({ message: "Error fetching all inventory locations" });
//   }
// };

// const renderInventoryLocationById = async (req, res) => {
//   try {
//     console.log(
//       `Controller: Fetching inventory location by ID: ${req.params.id}`
//     );
//     const inventoryLocation = await inventoryModel.getInventoryLocationById(
//       req.params.id
//     );
//     if (!inventoryLocation)
//       return res.status(404).json({ message: "Inventory location not found" });
//     res.status(200).json({
//       data: inventoryLocation,
//       message: "Inventory location fetched by ID",
//     });
//   } catch (error) {
//     console.error(
//       `Controller: Error fetching inventory location by ID (${req.params.id}):`,
//       error
//     );
//     res
//       .status(500)
//       .json({ message: "Error fetching inventory location by ID" });
//   }
// };

// const createNewInventoryLocation = async (req, res) => {
//   try {
//     console.log("Controller: Creating new inventory location");
//     const inventoryLocation = await inventoryModel.createInventoryLocation(
//       req.body
//     );
//     res.status(201).json({
//       data: inventoryLocation,
//       message: "New inventory location created",
//     });
//   } catch (error) {
//     console.error("Controller: Error creating new inventory location:", error);
//     res.status(500).json({ message: "Error creating new inventory location" });
//   }
// };

// const updateInventoryLocation = async (req, res) => {
//   try {
//     console.log(
//       `Controller: Updating inventory location with ID: ${req.params.id}`
//     );
//     const inventoryLocation = await inventoryModel.updateInventoryLocation(
//       req.params.id,
//       req.body
//     );
//     res.status(200).json({
//       data: inventoryLocation,
//       message: "Inventory location updated successfully",
//     });
//   } catch (error) {
//     console.error(
//       `Controller: Error updating inventory location (${req.params.id}):`,
//       error
//     );
//     res.status(500).json({ message: "Error updating inventory location" });
//   }
// };

// const deleteInventoryLocation = async (req, res) => {
//   try {
//     console.log(
//       `Controller: Deleting inventory location with ID: ${req.params.id}`
//     );
//     await inventoryModel.removeInventoryLocation(req.params.id);
//     res
//       .status(200)
//       .json({ message: "Inventory location deleted successfully" });
//   } catch (error) {
//     console.error(
//       `Controller: Error deleting inventory location (${req.params.id}):`,
//       error
//     );
//     res.status(500).json({ message: "Error deleting inventory location" });
//   }
// };

// Stock Controllers
const renderAllStock = async (req, res) => {
  try {
    console.log("Controller: Fetching all stock");
    const stock = await inventoryModel.getAllStock();
    res.status(200).json({ data: stock, message: "All stock fetched" });
  } catch (error) {
    console.error("Controller: Error fetching all stock:", error);
    res.status(500).json({ message: "Error fetching all stock" });
  }
};

const renderStockById = async (req, res) => {
  try {
    console.log(`Controller: Fetching stock by ID: ${req.params.id}`);
    const stock = await inventoryModel.getStockById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock not found" });
    res.status(200).json({ data: stock, message: "Stock fetched by ID" });
  } catch (error) {
    console.error(
      `Controller: Error fetching stock by ID (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error fetching stock by ID" });
  }
};

const createNewStock = async (req, res) => {
  try {
    console.log("Controller: Creating new stock");
    const stock = await inventoryModel.createStock(req.body);
    res.status(201).json({ data: stock, message: "New stock created" });
  } catch (error) {
    console.error("Controller: Error creating new stock:", error);
    res.status(500).json({ message: "Error creating new stock" });
  }
};

const updateStock = async (req, res) => {
  try {
    console.log(`Controller: Updating stock with ID: ${req.params.id}`);
    const stock = await inventoryModel.updateStock(req.params.id, req.body);
    res
      .status(200)
      .json({ data: stock, message: "Stock updated successfully" });
  } catch (error) {
    console.error(
      `Controller: Error updating stock (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error updating stock" });
  }
};

const deleteStock = async (req, res) => {
  try {
    console.log(`Controller: Deleting stock with ID: ${req.params.id}`);
    await inventoryModel.removeStock(req.params.id);
    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    console.error(
      `Controller: Error deleting stock (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error deleting stock" });
  }
};

module.exports = {
  // Inventory controllers
  renderAllInventories,
  renderInventoryById,
  createNewInventory,
  updateInventory,
  deleteInventory,

  // Batch Details controllers
  renderAllBatchDetails,
  renderBatchDetailById,
  createNewBatchDetail,
  updateBatchDetail,
  deleteBatchDetail,

  // Product Batches controllers
  renderAllProductBatches,
  renderProductBatchById,
  createNewProductBatch,
  updateProductBatch,
  deleteProductBatch,

  // Inventory Records controllers
  renderAllInventoryRecords,
  renderInventoryRecordById,
  createNewInventoryRecord,
  updateInventoryRecord,
  deleteInventoryRecord,

  // // Inventory Locations controllers
  // renderAllInventoryLocations,
  // renderInventoryLocationById,
  // createNewInventoryLocation,
  // updateInventoryLocation,
  // deleteInventoryLocation,

  // Stock controllers
  renderAllStock,
  renderStockById,
  createNewStock,
  updateStock,
  deleteStock,
};

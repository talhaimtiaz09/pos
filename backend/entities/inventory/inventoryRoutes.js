const express = require("express");
const router = express.Router();
const inventoryController = require("./inventoryController");

// Batch Details Routes
router.get("/batch-detail", inventoryController.renderAllBatchDetails);
router.get("/batch-detail/:id", inventoryController.renderBatchDetailById);
router.post("/batch-detail", inventoryController.createNewBatchDetail);
router.put("/batch-detail/:id", inventoryController.updateBatchDetail);
router.delete("/batch-detail/:id", inventoryController.deleteBatchDetail);

// Product Batches Routes
router.get("/batch", inventoryController.renderAllProductBatches);
router.get("/batch/:id", inventoryController.renderProductBatchById);
router.post("/batch", inventoryController.createNewProductBatch);
router.put("/batch/:id", inventoryController.updateProductBatch);
router.delete("/batch/:id", inventoryController.deleteProductBatch);

// Inventory Records Routes
router.get("/record", inventoryController.renderAllInventoryRecords);
router.get("/record/:id", inventoryController.renderInventoryRecordById);
router.post("/record", inventoryController.createNewInventoryRecord);
router.put("/record/:id", inventoryController.updateInventoryRecord);
router.delete("/record/:id", inventoryController.deleteInventoryRecord);

// // Inventory Locations Routes
// router.get("/location", inventoryController.renderAllInventoryLocations);
// router.get("/location/:id", inventoryController.renderInventoryLocationById);
// router.post("/location", inventoryController.createNewInventoryLocation);
// router.put("/location/:id", inventoryController.updateInventoryLocation);
// router.delete("/location/:id", inventoryController.deleteInventoryLocation);

// Stock Routes
router.get("/stock", inventoryController.renderAllStock);
router.get("/stock/:id", inventoryController.renderStockById);
router.post("/stock", inventoryController.createNewStock);
router.put("/stock/:id", inventoryController.updateStock);
router.delete("/stock/:id", inventoryController.deleteStock);

// Inventory Routes
router.get("/", inventoryController.renderAllInventories);
router.get("/:id", inventoryController.renderInventoryById);
router.post("/", inventoryController.createNewInventory);
router.put("/:id", inventoryController.updateInventory);
router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;

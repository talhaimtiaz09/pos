const express = require("express");
const router = express.Router();
const stakeholderController = require("./stakeholderController");

// Function to log request body (for debugging)
function requestSeeker(req, res, next) {
  console.log("req.body", req.body);
  next(); // Call next to proceed to the next middleware or route handler
}
// Stakeholder Category Routes
router.get("/category", stakeholderController.renderAllStakeholderCategories);
router.get(
  "/category/:id",
  stakeholderController.renderStakeholderCategoryById
);
router.post(
  "/category",
  requestSeeker,
  stakeholderController.createNewStakeholderCategory
);
router.put(
  "/category/:id",
  requestSeeker,
  stakeholderController.updateStakeholderCategory
);
router.delete("/category/:id", stakeholderController.deleteStakeholderCategory);

// Stakeholder Routes
router.get("/", stakeholderController.renderAllStakeholders);
router.get("/:id", stakeholderController.renderStakeholderById);
router.post("/", requestSeeker, stakeholderController.createNewStakeholder);
router.put("/:id", requestSeeker, stakeholderController.updateStakeholder);
router.delete("/:id", stakeholderController.deleteStakeholder);

module.exports = router;

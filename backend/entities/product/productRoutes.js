const express = require("express");
const router = express.Router();
const productController = require("./productController");

// Function to log request body (can be used for debugging)
function requestSeeker(req, res, next) {
  console.log("req.body", req.body);
  next(); // Call next to proceed to the next middleware or route handler
}

// Category Routes
router.get("/category", productController.renderAllCategories);
router.get("/category/:id", productController.renderCategoryById);
router.post("/category", productController.createNewCategory);
router.put("/category/:id", productController.updateCategory);
router.delete("/category/:id", productController.deleteCategory);

// Subcategory Routes
router.get("/subcategory", productController.renderAllSubcategories);
router.get("/subcategory/:id", productController.renderSubcategoryById);
router.post("/subcategory", productController.createNewSubcategory);
router.put("/subcategory/:id", productController.updateSubcategory);
router.delete("/subcategory/:id", productController.deleteSubcategory);

// Unit Routes
router.get("/unit", productController.renderAllUnits);
router.get("/unit/:id", productController.renderUnitById);
router.post("/unit", requestSeeker, productController.createNewUnit);
router.put("/unit/:id", productController.updateUnit);
router.delete("/unit/:id", productController.deleteUnit);

// // Product Routes
router.get("/", productController.renderAllProducts);
router.get("/:id", productController.renderProductById);
router.post("/", productController.createNewProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;

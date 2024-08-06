const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

// List all products
router.get("/products", productController.renderAllProducts);

// View a single product
router.get("/products/:id", productController.renderProductById);

// Create a new product
router.post("/products", productController.createNewProduct);

// Update a product

router.put("/products/:id", productController.updateProduct);

// Delete a product

router.delete("/products/:id", productController.deleteProduct);

module.exports = router;

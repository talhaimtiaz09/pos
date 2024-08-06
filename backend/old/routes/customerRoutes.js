const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customerController");
//route tester
router.get("/test", (req, res) => {
  res.send("Hello from customer route");
});

// List all customers
router.get("/", customerController.renderAllcustomers);

// View a single customer
router.get("/:id", customerController.rendercustomerById);

// Create a new customer
router.post("/new/", customerController.createNewcustomer);

// Update a customer

router.put("/update/:id", customerController.updatecustomer);

// Delete a customer

router.delete("/delete/:id", customerController.deletecustomer);

module.exports = router;

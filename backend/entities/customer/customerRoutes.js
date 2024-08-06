const express = require("express");
const router = express.Router();
const customerController = require("./customerController");

router.get("/test", (req, res) => {
  res.send("Hello from customer route");
});

router.get("/get-all", customerController.renderAllcustomers);

router.get("/:id", customerController.rendercustomerById);

router.post("/new", customerController.createNewcustomer);

router.put("/update/:id", customerController.updatecustomer);

router.delete("/delete/:id", customerController.deletecustomer);

module.exports = router;

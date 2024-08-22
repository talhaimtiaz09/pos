const express = require("express");
const router = express.Router();
const customerController = require("./customerController");

router.get("/test", (req, res) => {
  res.send("Hello from customer route");
});

router.get("/", customerController.renderAllcustomers);

router.get("/:id", customerController.rendercustomerById);

router.post("/", customerController.createNewcustomer);

router.put("/:id", customerController.updatecustomer);

router.delete("/:id", customerController.deletecustomer);

module.exports = router;

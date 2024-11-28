const express = require("express");
const router = express.Router();
const customerController = require("./customerController");

router.get("/test", (req, res) => {
  res.send("Hello from customer route");
});

router.put("/:id", customerController.updatecustomer);
router.get("/:id", customerController.rendercustomerById);
router.delete("/:id", customerController.deletecustomer);

router.post("/new", customerController.createNewcustomer);
router.get("/", customerController.renderAllcustomers);

module.exports = router;

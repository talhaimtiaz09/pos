const express = require("express");
const router = express.Router();
const salesController = require("./salesController");
const creditSalesController = require("./creditSalesController");
const creditPaymentController = require("./creditPaymentController");

// Credit Sales routes
router.get("/credit_sales", creditSalesController.renderAllCreditSales);
router.get("/credit_sales/:id", creditSalesController.renderCreditSaleById);
router.post("/credit_sales", creditSalesController.createNewCreditSale);
router.put("/credit_sales/:id", creditSalesController.updateCreditSale);
router.delete("/credit_sales/:id", creditSalesController.deleteCreditSale);

// Credit Payment routes
router.get("/credit_payments", creditPaymentController.getAllCreditPayments);
router.get(
  "/credit_payments/:id",
  creditPaymentController.getCreditPaymentById
);
router.post("/credit_payments", creditPaymentController.createCreditPayment);
router.put("/credit_payments/:id", creditPaymentController.updateCreditPayment);
router.delete(
  "/credit_payments/:id",
  creditPaymentController.removeCreditPayment
);
// Sales routes
router.get("/", salesController.renderAllSales);
router.get("/:id", salesController.renderSaleById);
router.post("/", salesController.createNewSale);
router.put("/:id", salesController.updateSale);
router.delete("/:id", salesController.deleteSale);

module.exports = router;

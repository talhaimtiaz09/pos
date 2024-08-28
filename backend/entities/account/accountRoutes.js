const express = require("express");
const router = express.Router();
const accountController = require("./accountController");
const transactionController = require("./transactionController");

// Account Category Routes
router.get("/category", accountController.renderAllAccountCategories);
router.get("/category/:id", accountController.renderAccountCategoryById);
router.post("/category", accountController.createNewAccountCategory);
router.put("/category/:id", accountController.updateAccountCategory);
router.delete("/category/:id", accountController.deleteAccountCategory);

// transaction routes

router.get("/transaction", transactionController.renderAllTransactions);
router.get("/transaction/:id", transactionController.renderTransactionById);
router.post("/transaction", transactionController.createNewTransaction);

// Account Routes
router.get("/", accountController.renderAllAccounts);
router.get("/:id", accountController.renderAccountById);
router.post("/", accountController.createNewAccount);
router.put("/:id", accountController.updateAccount);
router.delete("/:id", accountController.deleteAccount);

module.exports = router;

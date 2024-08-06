const transactionModel = require("../models/transactionModel");

const renderAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.getAll();
    res.render("transactions/index", { transactions });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const renderTransactionById = async (req, res) => {
  try {
    const transaction = await transactionModel.getById(req.params.id);
    if (!transaction) return res.status(404).send("Transaction not found");
    res.render("transactions/view", { transaction });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const createNewTransaction = async (req, res) => {
  try {
    const transaction = await transactionModel.create(req.body);
    res.redirect("/transactions");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transaction = await transactionModel.update(req.params.id, req.body);
    res.redirect("/transactions");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.delete(req.params.id);
    res.redirect("/transactions");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  renderAllTransactions,
  renderTransactionById,
  createNewTransaction,
  updateTransaction,
  deleteTransaction,
};

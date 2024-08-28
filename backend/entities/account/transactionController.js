const transactionModel = require("./transactionModel");

// Transaction Controllers
const renderAllTransactions = async (req, res) => {
  try {
    console.log("Controller: Fetching all transactions");
    const transactions = await transactionModel.getAllTransactions();
    res
      .status(200)
      .json({ data: transactions, message: "All transactions fetched" });
  } catch (error) {
    console.error("Controller: Error fetching all transactions:", error);
    res.status(500).json({ message: "Error fetching all transactions" });
  }
};

const renderTransactionById = async (req, res) => {
  try {
    console.log(`Controller: Fetching transaction by ID: ${req.params.id}`);
    const transaction = await transactionModel.getTransactionById(
      req.params.id
    );
    if (!transaction)
      return res.status(404).json({ message: "Transaction not found" });
    res
      .status(200)
      .json({ data: transaction, message: "Transaction fetched by ID" });
  } catch (error) {
    console.error(
      `Controller: Error fetching transaction by ID (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error fetching transaction by ID" });
  }
};

const createNewTransaction = async (req, res) => {
  try {
    console.log("Controller: Creating new transaction");
    const transaction = await transactionModel.createTransaction(req.body);
    res
      .status(201)
      .json({ data: transaction, message: "New transaction created" });
  } catch (error) {
    console.error("Controller: Error creating new transaction:", error);
    res.status(500).json({ message: "Error creating new transaction" });
  }
};

module.exports = {
  renderAllTransactions,
  renderTransactionById,
  createNewTransaction,
};

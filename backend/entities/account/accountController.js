const accountModel = require("./accountModel");

// Account Controllers
const renderAllAccounts = async (req, res) => {
  try {
    console.log("Controller: Fetching all accounts");
    const accounts = await accountModel.getAllAccounts();
    res.status(200).json({ data: accounts, message: "All accounts fetched" });
  } catch (error) {
    console.error("Controller: Error fetching all accounts:", error);
    res.status(500).json({ message: "Error fetching all accounts" });
  }
};

const renderAccountById = async (req, res) => {
  try {
    console.log(`Controller: Fetching account by ID: ${req.params.id}`);
    const account = await accountModel.getAccountById(req.params.id);
    if (!account) return res.status(404).json({ message: "Account not found" });
    res.status(200).json({ data: account, message: "Account fetched by ID" });
  } catch (error) {
    console.error(
      `Controller: Error fetching account by ID (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error fetching account by ID" });
  }
};

const createNewAccount = async (req, res) => {
  try {
    console.log("Controller: Creating new account");
    const account = await accountModel.createAccount(req.body);
    res.status(201).json({ data: account, message: "New account created" });
  } catch (error) {
    console.error("Controller: Error creating new account:", error);
    res.status(500).json({ message: "Error creating new account" });
  }
};

const updateAccount = async (req, res) => {
  try {
    console.log(`Controller: Updating account with ID: ${req.params.id}`);
    const account = await accountModel.updateAccount(req.params.id, req.body);
    res
      .status(200)
      .json({ data: account, message: "Account updated successfully" });
  } catch (error) {
    console.error(
      `Controller: Error updating account (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error updating account" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    console.log(`Controller: Deleting account with ID: ${req.params.id}`);
    await accountModel.removeAccount(req.params.id);
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(
      `Controller: Error deleting account (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error deleting account" });
  }
};

// Account Category Controllers
const renderAllAccountCategories = async (req, res) => {
  try {
    console.log("Controller: Fetching all account categories");
    const categories = await accountModel.getAllAccountCategories();
    res
      .status(200)
      .json({ data: categories, message: "All account categories fetched" });
  } catch (error) {
    console.error("Controller: Error fetching all account categories:", error);
    res.status(500).json({ message: "Error fetching all account categories" });
  }
};

const renderAccountCategoryById = async (req, res) => {
  try {
    console.log(
      `Controller: Fetching account category by ID: ${req.params.id}`
    );
    const category = await accountModel.getAccountCategoryById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Account category not found" });
    res
      .status(200)
      .json({ data: category, message: "Account category fetched by ID" });
  } catch (error) {
    console.error(
      `Controller: Error fetching account category by ID (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error fetching account category by ID" });
  }
};

const createNewAccountCategory = async (req, res) => {
  try {
    console.log("Controller: Creating new account category");
    const category = await accountModel.createAccountCategory(req.body.name);
    res
      .status(201)
      .json({ data: category, message: "New account category created" });
  } catch (error) {
    console.error("Controller: Error creating new account category:", error);
    res.status(500).json({ message: "Error creating new account category" });
  }
};

const updateAccountCategory = async (req, res) => {
  try {
    console.log(
      `Controller: Updating account category with ID: ${req.params.id}`
    );
    const category = await accountModel.updateAccountCategory(
      req.params.id,
      req.body.name
    );
    res.status(200).json({
      data: category,
      message: "Account category updated successfully",
    });
  } catch (error) {
    console.error(
      `Controller: Error updating account category (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error updating account category" });
  }
};

const deleteAccountCategory = async (req, res) => {
  try {
    console.log(
      `Controller: Deleting account category with ID: ${req.params.id}`
    );
    await accountModel.removeAccountCategory(req.params.id);
    res.status(200).json({ message: "Account category deleted successfully" });
  } catch (error) {
    console.error(
      `Controller: Error deleting account category (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error deleting account category" });
  }
};

module.exports = {
  // Account controllers
  renderAllAccounts,
  renderAccountById,
  createNewAccount,
  updateAccount,
  deleteAccount,

  // Account Category controllers
  renderAllAccountCategories,
  renderAccountCategoryById,
  createNewAccountCategory,
  updateAccountCategory,
  deleteAccountCategory,
};

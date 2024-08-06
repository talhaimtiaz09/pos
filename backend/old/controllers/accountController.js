const accountCategoryModel = require("../models/accountCategoryModel");

const renderAllAccountCategories = async (req, res) => {
  try {
    const accountCategories = await accountCategoryModel.getAll();
    res.render("accountCategories/index", { accountCategories });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const renderAccountCategoryById = async (req, res) => {
  try {
    const accountCategory = await accountCategoryModel.getById(req.params.id);
    if (!accountCategory)
      return res.status(404).send("Account Category not found");
    res.render("accountCategories/view", { accountCategory });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const createNewAccountCategory = async (req, res) => {
  try {
    const accountCategory = await accountCategoryModel.create(req.body);
    res.redirect("/accountCategories");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const updateAccountCategory = async (req, res) => {
  try {
    const accountCategory = await accountCategoryModel.update(
      req.params.id,
      req.body
    );
    res.redirect("/accountCategories");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const deleteAccountCategory = async (req, res) => {
  try {
    await accountCategoryModel.delete(req.params.id);
    res.redirect("/accountCategories");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  renderAllAccountCategories,
  renderAccountCategoryById,
  createNewAccountCategory,
  updateAccountCategory,
  deleteAccountCategory,
};

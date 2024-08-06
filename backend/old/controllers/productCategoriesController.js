const productCategoryModel = require("../models/productCategoryModel");

const renderAllProductCategories = async (req, res) => {
  try {
    const productCategories = await productCategoryModel.getAll();
    res.render("productCategories/index", { productCategories });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const renderProductCategoryById = async (req, res) => {
  try {
    const productCategory = await productCategoryModel.getById(req.params.id);
    if (!productCategory)
      return res.status(404).send("Product Category not found");
    res.render("productCategories/view", { productCategory });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const createNewProductCategory = async (req, res) => {
  try {
    const productCategory = await productCategoryModel.create(req.body);
    res.redirect("/productCategories");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const updateProductCategory = async (req, res) => {
  try {
    const productCategory = await productCategoryModel.update(
      req.params.id,
      req.body
    );
    res.redirect("/productCategories");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const deleteProductCategory = async (req, res) => {
  try {
    await productCategoryModel.delete(req.params.id);
    res.redirect("/productCategories");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  renderAllProductCategories,
  renderProductCategoryById,
  createNewProductCategory,
  updateProductCategory,
  deleteProductCategory,
};

const productModel = require("../models/productModel");

const renderAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAll();
    res.render("products/index", { products });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const renderProductById = async (req, res) => {
  try {
    const product = await productModel.getById(req.params.id);
    if (!product) return res.status(404).send("Product not found");
    res.render("products/view", { product });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const createNewProduct = async (req, res) => {
  try {
    const product = await productModel.create(req.body);
    res.redirect("/products");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await productModel.update(req.params.id, req.body);
    res.redirect("/products");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    await productModel.delete(req.params.id);
    res.redirect("/products");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  renderAllProducts,
  renderProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};

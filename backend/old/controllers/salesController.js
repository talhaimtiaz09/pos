const saleModel = require("../models/saleModel");

const renderAllSales = async (req, res) => {
  try {
    const sales = await saleModel.getAll();
    res.render("sales/index", { sales });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const renderSaleById = async (req, res) => {
  try {
    const sale = await saleModel.getById(req.params.id);
    if (!sale) return res.status(404).send("Sale not found");
    res.render("sales/view", { sale });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const createNewSale = async (req, res) => {
  try {
    const sale = await saleModel.create(req.body);
    res.redirect("/sales");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const updateSale = async (req, res) => {
  try {
    const sale = await saleModel.update(req.params.id, req.body);
    res.redirect("/sales");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const deleteSale = async (req, res) => {
  try {
    await saleModel.delete(req.params.id);
    res.redirect("/sales");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  renderAllSales,
  renderSaleById,
  createNewSale,
  updateSale,
  deleteSale,
};

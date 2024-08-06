const customerModel = require("../models/customerModel");

const renderAllcustomers = async (req, res) => {
  try {
    const customer = await customerModel.getAll();

    console.log(customer);

    res.status(200).json(customer);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const rendercustomerById = async (req, res) => {
  try {
    const customer = await customerModel.getById(req.params.id);
    if (!customer) return res.status(404).send("customer  not found");
    res.render("customer/view", { customer });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const createNewcustomer = async (req, res) => {
  try {
    const customer = await customerModel.create(req.body);
    res.redirect("/customer");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const updatecustomer = async (req, res) => {
  try {
    const customer = await customerModel.update(req.params.id, req.body);
    res.redirect("/customer");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const deletecustomer = async (req, res) => {
  try {
    await customerModel.delete(req.params.id);
    res.redirect("/customer");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  renderAllcustomers,
  rendercustomerById,
  createNewcustomer,
  updatecustomer,
  deletecustomer,
};

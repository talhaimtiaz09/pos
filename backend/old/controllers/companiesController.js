const companyModel = require("../models/companyModel");

const renderAllCompanies = async (req, res) => {
  try {
    const companies = await companyModel.getAll();
    res.render("companies/index", { companies });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const renderCompanyById = async (req, res) => {
  try {
    const company = await companyModel.getById(req.params.id);
    if (!company) return res.status(404).send("Company not found");
    res.render("companies/view", { company });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const createNewCompany = async (req, res) => {
  try {
    const company = await companyModel.create(req.body);
    res.redirect("/companies");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const updateCompany = async (req, res) => {
  try {
    const company = await companyModel.update(req.params.id, req.body);
    res.redirect("/companies");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const deleteCompany = async (req, res) => {
  try {
    await companyModel.delete(req.params.id);
    res.redirect("/companies");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  renderAllCompanies,
  renderCompanyById,
  createNewCompany,
  updateCompany,
  deleteCompany,
};

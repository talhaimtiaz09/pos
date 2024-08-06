const stakeholderModel = require("../models/stakeholderModel");

const renderAllStakeholders = async (req, res) => {
  try {
    const stakeholders = await stakeholderModel.getAll();
    res.render("stakeholders/index", { stakeholders });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const renderStakeholderById = async (req, res) => {
  try {
    const stakeholder = await stakeholderModel.getById(req.params.id);
    if (!stakeholder) return res.status(404).send("Stakeholder not found");
    res.render("stakeholders/view", { stakeholder });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const createNewStakeholder = async (req, res) => {
  try {
    const stakeholder = await stakeholderModel.create(req.body);
    res.redirect("/stakeholders");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const updateStakeholder = async (req, res) => {
  try {
    const stakeholder = await stakeholderModel.update(req.params.id, req.body);
    res.redirect("/stakeholders");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

const deleteStakeholder = async (req, res) => {
  try {
    await stakeholderModel.delete(req.params.id);
    res.redirect("/stakeholders");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  renderAllStakeholders,
  renderStakeholderById,
  createNewStakeholder,
  updateStakeholder,
  deleteStakeholder,
};

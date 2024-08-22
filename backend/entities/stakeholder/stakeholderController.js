const stakeholderModel = require("./stakeholderModel");

// Stakeholder Controllers
const renderAllStakeholders = async (req, res) => {
  try {
    console.log("Controller: Fetching all stakeholders");
    const stakeholders = await stakeholderModel.getAllStakeholders();
    res
      .status(200)
      .json({ data: stakeholders, message: "All stakeholders fetched" });
  } catch (error) {
    console.error("Controller: Error fetching all stakeholders:", error);
    res.status(500).json({ message: "Error fetching all stakeholders" });
  }
};

const renderStakeholderById = async (req, res) => {
  try {
    console.log(`Controller: Fetching stakeholder by ID: ${req.params.id}`);
    const stakeholder = await stakeholderModel.getStakeholderById(
      req.params.id
    );
    if (!stakeholder)
      return res.status(404).json({ message: "Stakeholder not found" });
    res
      .status(200)
      .json({ data: stakeholder, message: "Stakeholder fetched by ID" });
  } catch (error) {
    console.error(
      `Controller: Error fetching stakeholder by ID (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error fetching stakeholder by ID" });
  }
};

const createNewStakeholder = async (req, res) => {
  try {
    console.log("Controller: Creating new stakeholder");
    const stakeholder = await stakeholderModel.createStakeholder(req.body);
    res
      .status(201)
      .json({ data: stakeholder, message: "New stakeholder created" });
  } catch (error) {
    console.error("Controller: Error creating new stakeholder:", error);
    res.status(500).json({ message: "Error creating new stakeholder" });
  }
};

const updateStakeholder = async (req, res) => {
  try {
    console.log(`Controller: Updating stakeholder with ID: ${req.params.id}`);
    const stakeholder = await stakeholderModel.updateStakeholder(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .json({ data: stakeholder, message: "Stakeholder updated successfully" });
  } catch (error) {
    console.error(
      `Controller: Error updating stakeholder (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error updating stakeholder" });
  }
};

const deleteStakeholder = async (req, res) => {
  try {
    console.log(`Controller: Deleting stakeholder with ID: ${req.params.id}`);
    await stakeholderModel.removeStakeholder(req.params.id);
    res.status(200).json({ message: "Stakeholder deleted successfully" });
  } catch (error) {
    console.error(
      `Controller: Error deleting stakeholder (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error deleting stakeholder" });
  }
};

// Stakeholder Category Controllers
const renderAllStakeholderCategories = async (req, res) => {
  try {
    console.log("Controller: Fetching all stakeholder categories");
    const categories = await stakeholderModel.getAllStakeholderCategories();
    res
      .status(200)
      .json({
        data: categories,
        message: "All stakeholder categories fetched",
      });
  } catch (error) {
    console.error(
      "Controller: Error fetching all stakeholder categories:",
      error
    );
    res
      .status(500)
      .json({ message: "Error fetching all stakeholder categories" });
  }
};

const renderStakeholderCategoryById = async (req, res) => {
  try {
    console.log(
      `Controller: Fetching stakeholder category by ID: ${req.params.id}`
    );
    const category = await stakeholderModel.getStakeholderCategoryById(
      req.params.id
    );
    if (!category)
      return res
        .status(404)
        .json({ message: "Stakeholder category not found" });
    res
      .status(200)
      .json({ data: category, message: "Stakeholder category fetched by ID" });
  } catch (error) {
    console.error(
      `Controller: Error fetching stakeholder category by ID (${req.params.id}):`,
      error
    );
    res
      .status(500)
      .json({ message: "Error fetching stakeholder category by ID" });
  }
};

const createNewStakeholderCategory = async (req, res) => {
  try {
    console.log("Controller: Creating new stakeholder category");
    const category = await stakeholderModel.createStakeholderCategory(
      req.body.name
    );
    res
      .status(201)
      .json({ data: category, message: "New stakeholder category created" });
  } catch (error) {
    console.error(
      "Controller: Error creating new stakeholder category:",
      error
    );
    res
      .status(500)
      .json({ message: "Error creating new stakeholder category" });
  }
};

const updateStakeholderCategory = async (req, res) => {
  try {
    console.log(
      `Controller: Updating stakeholder category with ID: ${req.params.id}`
    );
    const category = await stakeholderModel.updateStakeholderCategory(
      req.params.id,
      req.body.name
    );
    res
      .status(200)
      .json({
        data: category,
        message: "Stakeholder category updated successfully",
      });
  } catch (error) {
    console.error(
      `Controller: Error updating stakeholder category (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error updating stakeholder category" });
  }
};

const deleteStakeholderCategory = async (req, res) => {
  try {
    console.log(
      `Controller: Deleting stakeholder category with ID: ${req.params.id}`
    );
    await stakeholderModel.removeStakeholderCategory(req.params.id);
    res
      .status(200)
      .json({ message: "Stakeholder category deleted successfully" });
  } catch (error) {
    console.error(
      `Controller: Error deleting stakeholder category (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error deleting stakeholder category" });
  }
};

module.exports = {
  // Stakeholder controllers
  renderAllStakeholders,
  renderStakeholderById,
  createNewStakeholder,
  updateStakeholder,
  deleteStakeholder,

  // Stakeholder Category controllers
  renderAllStakeholderCategories,
  renderStakeholderCategoryById,
  createNewStakeholderCategory,
  updateStakeholderCategory,
  deleteStakeholderCategory,
};

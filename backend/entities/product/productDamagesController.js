const productDamagesModel = require("./productDamagesModel");

const renderAllDamages = async (req, res) => {
  try {
    const damages = await productDamagesModel.getAllDamages();
    res.status(200).json({ data: damages, message: "All damages fetched" });
  } catch (error) {
    console.error("Controller: Error fetching all damages:", error);
    res.status(500).json({ message: "Error fetching all damages" });
  }
};

const renderDamageById = async (req, res) => {
  try {
    const damage = await productDamagesModel.getDamageById(req.params.id);
    if (!damage)
      return res.status(404).json({ message: "Damage record not found" });
    res.status(200).json({ data: damage, message: "Damage fetched by ID" });
  } catch (error) {
    console.error(
      `Controller: Error fetching damage by ID (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error fetching damage by ID" });
  }
};

const createNewDamage = async (req, res) => {
  try {
    const damage = await productDamagesModel.createDamage(req.body);
    res
      .status(201)
      .json({ data: damage, message: "New damage record created" });
  } catch (error) {
    console.error("Controller: Error creating new damage record:", error);
    res.status(500).json({ message: "Error creating new damage record" });
  }
};

const updateDamage = async (req, res) => {
  try {
    const damage = await productDamagesModel.updateDamage(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .json({ data: damage, message: "Damage record updated successfully" });
  } catch (error) {
    console.error(
      `Controller: Error updating damage record (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error updating damage record" });
  }
};

const deleteDamage = async (req, res) => {
  try {
    await productDamagesModel.removeDamage(req.params.id);
    res.status(200).json({ message: "Damage record deleted successfully" });
  } catch (error) {
    console.error(
      `Controller: Error deleting damage record (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error deleting damage record" });
  }
};

module.exports = {
  renderAllDamages,
  renderDamageById,
  createNewDamage,
  updateDamage,
  deleteDamage,
};

const salesModel = require("./salesModel");

// Sales Controllers
const renderAllSales = async (req, res) => {
  try {
    console.log("Controller: Fetching all sales");
    const sales = await salesModel.getAllSales();
    res.status(200).json({ data: sales, message: "All sales fetched" });
  } catch (error) {
    console.error("Controller: Error fetching all sales:", error);
    res.status(500).json({ message: "Error fetching all sales" });
  }
};

const renderSaleById = async (req, res) => {
  try {
    console.log(`Controller: Fetching sale by ID: ${req.params.id}`);
    const sale = await salesModel.getSaleById(req.params.id);
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    res.status(200).json({ data: sale, message: "Sale fetched by ID" });
  } catch (error) {
    console.error(
      `Controller: Error fetching sale by ID (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error fetching sale by ID" });
  }
};

const createNewSale = async (req, res) => {
  try {
    console.log("Controller: Creating new sale");
    const sale = await salesModel.createSale(req.body);
    res.status(201).json({ data: sale, message: "New sale created" });
  } catch (error) {
    console.error("Controller: Error creating new sale:", error);
    res.status(500).json({ message: "Error creating new sale" });
  }
};

const updateSale = async (req, res) => {
  try {
    console.log(`Controller: Updating sale with ID: ${req.params.id}`);
    const sale = await salesModel.updateSale(req.params.id, req.body);
    if (!sale) return res.status(404).json({ message: "Sale not found" });
    res.status(200).json({ data: sale, message: "Sale updated successfully" });
  } catch (error) {
    console.error(`Controller: Error updating sale (${req.params.id}):`, error);
    res.status(500).json({ message: "Error updating sale" });
  }
};

const deleteSale = async (req, res) => {
  try {
    console.log(`Controller: Deleting sale with ID: ${req.params.id}`);
    await salesModel.removeSale(req.params.id);
    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    console.error(`Controller: Error deleting sale (${req.params.id}):`, error);
    res.status(500).json({ message: "Error deleting sale" });
  }
};

module.exports = {
  renderAllSales,
  renderSaleById,
  createNewSale,
  updateSale,
  deleteSale,
};

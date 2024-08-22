const creditSalesModel = require("./creditSalesModel");

// Credit Sales Controllers
const renderAllCreditSales = async (req, res) => {
  try {
    console.log("Controller: Fetching all credit sales");
    const creditSales = await creditSalesModel.getAllCreditSales();
    res
      .status(200)
      .json({ data: creditSales, message: "All credit sales fetched" });
  } catch (error) {
    console.error("Controller: Error fetching all credit sales:", error);
    res.status(500).json({ message: "Error fetching all credit sales" });
  }
};

const renderCreditSaleById = async (req, res) => {
  try {
    console.log(`Controller: Fetching credit sale by ID: ${req.params.id}`);
    const creditSale = await creditSalesModel.getCreditSaleById(req.params.id);
    if (!creditSale)
      return res.status(404).json({ message: "Credit sale not found" });
    res
      .status(200)
      .json({ data: creditSale, message: "Credit sale fetched by ID" });
  } catch (error) {
    console.error(
      `Controller: Error fetching credit sale by ID (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error fetching credit sale by ID" });
  }
};

const createNewCreditSale = async (req, res) => {
  try {
    console.log("Controller: Creating new credit sale");
    const creditSale = await creditSalesModel.createCreditSale(req.body);
    res
      .status(201)
      .json({ data: creditSale, message: "New credit sale created" });
  } catch (error) {
    console.error("Controller: Error creating new credit sale:", error);
    res.status(500).json({ message: "Error creating new credit sale" });
  }
};

const updateCreditSale = async (req, res) => {
  try {
    console.log(`Controller: Updating credit sale with ID: ${req.params.id}`);
    const creditSale = await creditSalesModel.updateCreditSale(
      req.params.id,
      req.body
    );
    res.status(200).json({
      data: creditSale,
      message: "Credit sale updated successfully",
    });
  } catch (error) {
    console.error(
      `Controller: Error updating credit sale (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error updating credit sale" });
  }
};

const deleteCreditSale = async (req, res) => {
  try {
    console.log(`Controller: Deleting credit sale with ID: ${req.params.id}`);
    await creditSalesModel.removeCreditSale(req.params.id);
    res.status(200).json({ message: "Credit sale deleted successfully" });
  } catch (error) {
    console.error(
      `Controller: Error deleting credit sale (${req.params.id}):`,
      error
    );
    res.status(500).json({ message: "Error deleting credit sale" });
  }
};

module.exports = {
  renderAllCreditSales,
  renderCreditSaleById,
  createNewCreditSale,
  updateCreditSale,
  deleteCreditSale,
};

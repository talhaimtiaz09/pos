const creditPaymentModel = require("./creditPaymentModel");

// Credit Payment controller
const getAllCreditPayments = async (req, res) => {
  try {
    const creditPayments = await creditPaymentModel.getAllCreditPayments();
    res.status(200).json(creditPayments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCreditPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const creditPayment = await creditPaymentModel.getCreditPaymentById(id);
    if (creditPayment) {
      res.status(200).json(creditPayment);
    } else {
      res.status(404).json({ message: "Credit payment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCreditPayment = async (req, res) => {
  const creditPaymentData = req.body;
  try {
    const newCreditPayment = await creditPaymentModel.createCreditPayment(
      creditPaymentData
    );
    res.status(201).json(newCreditPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCreditPayment = async (req, res) => {
  const { id } = req.params;
  const creditPaymentData = req.body;
  try {
    const updatedCreditPayment = await creditPaymentModel.updateCreditPayment(
      id,
      creditPaymentData
    );
    if (updatedCreditPayment) {
      res.status(200).json(updatedCreditPayment);
    } else {
      res.status(404).json({ message: "Credit payment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeCreditPayment = async (req, res) => {
  const { id } = req.params;
  try {
    await creditPaymentModel.removeCreditPayment(id);
    res.status(204).json({ message: "Credit payment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCreditPayments,
  getCreditPaymentById,
  createCreditPayment,
  updateCreditPayment,
  removeCreditPayment,
};

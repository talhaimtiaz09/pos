const customerModel = require("./customerModel");

const renderAllcustomers = async (req, res) => {
  try {
    const customer = await customerModel.getAll();
    console.log(customer);
    const data = customer;
    res.status(200).json({ data, message: "All customers fetched" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching all customers" });
  }
};

const rendercustomerById = async (req, res) => {
  try {
    const customer = await customerModel.getById(req.params.id);
    if (!customer) return res.status(404).send("customer  not found");
    console.log(customer);
    res.status(200).json(customer, { message: "customer fetched by ID" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer by ID" });
  }
};

const createNewcustomer = async (req, res) => {
  try {
    console.log("testing customer route");
    const customer = await customerModel.create(req.body);
    console.log(`New customer Data : ${customer}`);
    if (customer.code === "23505") {
      return res
        .status(400)
        .json({ message: "Customer already exists with this phone number" });
    }
    const data = customer;
    res.status(200).json({ data, message: "New customer created" });
  } catch (error) {
    res.status(500).json({ message: `Error creating new customer: ${error}` });
  }
};

const updatecustomer = async (req, res) => {
  try {
    const customer = await customerModel.update(req.params.id, req.body);
    console.log(customer);
    res
      .status(200)
      .json(customer, { message: "customer updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating customer" });
  }
};

const deletecustomer = async (req, res) => {
  try {
    await customerModel.delete(req.params.id);
    console.log("customer deleted successfully");

    res.status(200).json({ message: "customer deleted successfully  " });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer" });
  }
};

module.exports = {
  renderAllcustomers,
  rendercustomerById,
  createNewcustomer,
  updatecustomer,
  deletecustomer,
};

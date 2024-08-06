const companyModel = require("./companyModel");

// Company Controllers
const renderAllCompanies = async (req, res) => {
  try {
    const companies = await companyModel.getAllCompanies();
    console.log("All companies fetched:", companies);
    res.status(200).json({ data: companies, message: "All companies fetched" });
  } catch (error) {
    console.error("Error fetching all companies:", error);
    res.status(500).json({ message: "Error fetching all companies" });
  }
};

const renderCompanyById = async (req, res) => {
  try {
    const company = await companyModel.getCompanyById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    console.log("Company fetched by ID:", company);
    res.status(200).json({ data: company, message: "Company fetched by ID" });
  } catch (error) {
    console.error("Error fetching company by ID:", error);
    res.status(500).json({ message: "Error fetching company by ID" });
  }
};

const createNewCompany = async (req, res) => {
  try {
    const company = await companyModel.createCompany(req.body);
    console.log("New company created:", company);
    res.status(200).json({ data: company, message: "New company created" });
  } catch (error) {
    console.error("Error creating new company:", error);
    res.status(500).json({ message: "Error creating new company" });
  }
};

const updateCompany = async (req, res) => {
  try {
    const company = await companyModel.updateCompany(req.params.id, req.body);
    console.log("Company updated successfully:", company);
    res
      .status(200)
      .json({ data: company, message: "Company updated successfully" });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ message: "Error updating company" });
  }
};

const deleteCompany = async (req, res) => {
  try {
    await companyModel.removeCompany(req.params.id);
    console.log("Company deleted successfully:", req.params.id);
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ message: "Error deleting company" });
  }
};

// Booking Controllers
const renderAllBookings = async (req, res) => {
  try {
    const bookings = await companyModel.getAllBookings();
    console.log("All bookings fetched:", bookings);
    res.status(200).json({ data: bookings, message: "All bookings fetched" });
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    res.status(500).json({ message: "Error fetching all bookings" });
  }
};

const renderBookingById = async (req, res) => {
  try {
    const booking = await companyModel.getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    console.log("Booking fetched by ID:", booking);
    res.status(200).json({ data: booking, message: "Booking fetched by ID" });
  } catch (error) {
    console.error("Error fetching booking by ID:", error);
    res.status(500).json({ message: "Error fetching booking by ID" });
  }
};

const createNewBooking = async (req, res) => {
  try {
    const booking = await companyModel.createBooking(req.body);
    console.log("New booking created:", booking);
    res.status(200).json({ data: booking, message: "New booking created" });
  } catch (error) {
    console.error("Error creating new booking:", error);
    res.status(500).json({ message: "Error creating new booking" });
  }
};

const updateBooking = async (req, res) => {
  try {
    const booking = await companyModel.updateBooking(req.params.id, req.body);
    console.log("Booking updated successfully:", booking);
    res
      .status(200)
      .json({ data: booking, message: "Booking updated successfully" });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Error updating booking" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await companyModel.removeBooking(req.params.id);
    console.log("Booking deleted successfully:", req.params.id);
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Error deleting booking" });
  }
};

// Sales Representative Controllers
const renderAllSalesReps = async (req, res) => {
  try {
    const salesReps = await companyModel.getAllSalesReps();
    console.log("All sales representatives fetched:", salesReps);
    res
      .status(200)
      .json({ data: salesReps, message: "All sales representatives fetched" });
  } catch (error) {
    console.error("Error fetching all sales representatives:", error);
    res
      .status(500)
      .json({ message: "Error fetching all sales representatives" });
  }
};

const renderSalesRepById = async (req, res) => {
  try {
    const salesRep = await companyModel.getSalesRepById(req.params.id);
    if (!salesRep)
      return res
        .status(404)
        .json({ message: "Sales representative not found" });
    console.log("Sales representative fetched by ID:", salesRep);
    res
      .status(200)
      .json({ data: salesRep, message: "Sales representative fetched by ID" });
  } catch (error) {
    console.error("Error fetching sales representative by ID:", error);
    res
      .status(500)
      .json({ message: "Error fetching sales representative by ID" });
  }
};

const createNewSalesRep = async (req, res) => {
  try {
    const salesRep = await companyModel.createSalesRep(req.body);
    console.log("New sales representative created:", salesRep);
    res
      .status(200)
      .json({ data: salesRep, message: "New sales representative created" });
  } catch (error) {
    console.error("Error creating new sales representative:", error);
    res
      .status(500)
      .json({ message: "Error creating new sales representative" });
  }
};

const updateSalesRep = async (req, res) => {
  try {
    const salesRep = await companyModel.updateSalesRep(req.params.id, req.body);
    console.log("Sales representative updated successfully:", salesRep);
    res
      .status(200)
      .json({
        data: salesRep,
        message: "Sales representative updated successfully",
      });
  } catch (error) {
    console.error("Error updating sales representative:", error);
    res.status(500).json({ message: "Error updating sales representative" });
  }
};

const deleteSalesRep = async (req, res) => {
  try {
    await companyModel.removeSalesRep(req.params.id);
    console.log("Sales representative deleted successfully:", req.params.id);
    res
      .status(200)
      .json({ message: "Sales representative deleted successfully" });
  } catch (error) {
    console.error("Error deleting sales representative:", error);
    res.status(500).json({ message: "Error deleting sales representative" });
  }
};

module.exports = {
  // Company controllers
  renderAllCompanies,
  renderCompanyById,
  createNewCompany,
  updateCompany,
  deleteCompany,

  // Booking controllers
  renderAllBookings,
  renderBookingById,
  createNewBooking,
  updateBooking,
  deleteBooking,

  // Sales Representative controllers
  renderAllSalesReps,
  renderSalesRepById,
  createNewSalesRep,
  updateSalesRep,
  deleteSalesRep,
};

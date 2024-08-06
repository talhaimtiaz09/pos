const express = require("express");
const router = express.Router();
const companyController = require("./companyController");

// Function to log request body (can be used for debugging)
function requestSeeker(req, res, next) {
  console.log("req.body", req.body);
  next(); // Call next to proceed to the next middleware or route handler
}

// Company Routes
router.get("/", companyController.renderAllCompanies);
router.get("/:id", companyController.renderCompanyById);
router.post("/", requestSeeker, companyController.createNewCompany);
router.put("/:id", requestSeeker, companyController.updateCompany);
router.delete("/:id", companyController.deleteCompany);

// Booking Routes
router.get("/bookings", companyController.renderAllBookings);
router.get("/bookings/:id", companyController.renderBookingById);
router.post("/bookings", requestSeeker, companyController.createNewBooking);
router.put("/bookings/:id", requestSeeker, companyController.updateBooking);
router.delete("/bookings/:id", companyController.deleteBooking);

// Sales Representative Routes
router.get("/sales-reps", companyController.renderAllSalesReps);
router.get("/sales-reps/:id", companyController.renderSalesRepById);
router.post("/sales-reps", requestSeeker, companyController.createNewSalesRep);
router.put("/sales-reps/:id", requestSeeker, companyController.updateSalesRep);
router.delete("/sales-reps/:id", companyController.deleteSalesRep);

module.exports = router;

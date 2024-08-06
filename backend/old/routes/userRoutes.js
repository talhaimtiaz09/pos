const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// List all users
router.get("/users", userController.renderAllUsers);

// View a single user
router.get("/users/:id", userController.renderUserById);

// Create a new user
router.post("/users", userController.createNewUser);

// Update a user
router.put("/users/:id", userController.updateUser);

// Delete a user
router.delete("/users/:id", userController.deleteUser);

module.exports = router;

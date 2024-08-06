const userModel = require("../models/userModel");

// Render all users
const renderAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.render("index", { users });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Render a user by ID
const renderUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.render("user", { user });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Create a new user
const createNewUser = async (req, res) => {
  try {
    const user = await userModel.createUser(req.body);
    res.redirect("/users");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await userModel.updateUser(req.params.id, req.body);
    res.redirect("/users");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    await userModel.deleteUser(req.params.id);
    res.redirect("/users");
  } catch (error) {
    res.status(500).send("Server error");
  }
};

module.exports = {
  renderAllUsers,
  renderUserById,
  createNewUser,
  updateUser,
  deleteUser,
};

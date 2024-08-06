const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const username = "admin";
    const email = "admin@example.com";
    const password = "password123";

    let user = await User.findOne({ email });
    if (user) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    user = new User({ username, email });
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    console.log("Admin user created");
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

createAdmin();

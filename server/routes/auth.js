const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const authRouter = express.Router();

// SIGNUP API
authRouter.post("/api/signup", async (req, res) => {
  try {
    // get the data from client
    const { name, email, password } = req.body;

    // validate the data

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // post the data in db
    let user = new User({ name, email, password: hashedPassword });
    user = await user.save();

    // return response to client
    res.status(201).json({ message: "user created successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = authRouter;

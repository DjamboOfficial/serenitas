const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const authRouter = express.Router();

authRouter.use(express.json());
authRouter.use(cookieParser());

const User = require("../models/User.model");

// User Signup
authRouter.post("/signup", async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    // Validate inputs
    if (!email || !password || !username) {
      return res.status(400).json({ error: "All inputs are required" });
    }

    // Check if the user already exists
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ error: "User is already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      email,
      username,
      password: hash,
    });

    // Generate a token for the user
    const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // Store the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      // Other options like secure, sameSite, etc., can be added based on your needs
    });

    // Asynchronously add the token to the user's profile
    await User.findByIdAndUpdate(newUser._id, { $push: { tokens: token } });
    console.log(`1. User signed up - User ID: ${newUser._id}, Token: ${token}`);

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// User Login
authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
      return res.status(400).json({ error: "All inputs are required" });
    }

    // Check if the user exists
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Verify the password
    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }

    // Generate a token
    const token = jwt.sign(
      { userId: foundUser._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Send the token in an HTTP-only cookie
    res.cookie("token", token, { httpOnly: true });

    // Asynchronously add the token to the user's profile
    await User.findByIdAndUpdate(foundUser._id, { $push: { tokens: token } });
    console.log(
      `2. User logged in - User ID: ${foundUser._id}, Token: ${token}`
    );

    res.json({ token });
  } catch (err) {
    next(err);
  }
});

// Verify User
authRouter.get("/verify", (req, res) => {
  const userId = req.user ? req.user.userId : "No user found";
  console.log(`3. Verifying user - User ID: ${userId}`);
  res.json({ message: "User verified" });
});

// User Logout
authRouter.post("/logout", (req, res) => {
  const userId = req.user ? req.user.userId : "No user found";
  console.log(`4. Logging out user - User ID: ${userId}`);
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
});

module.exports = authRouter;

const express = require("express");
const authRouter = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const isAuthenticated = require("../middleware/isAuthenticated");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

authRouter.use(cookieParser());

authRouter.post("/signup", async (req, res, next) => {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ error: "All inputs are required" });
  }
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ error: "User is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Generate a token for the user
    const token = jwt.sign({ email, username }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // Store the token in the user document
    const createdUser = await User.create({
      email,
      username,
      password: hash,
      accessToken: token, // Change 'token' to your desired field name
    });

    res.json(createdUser);
  } catch (err) {
    next(err);
  }
});

authRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All inputs are required" });
  }
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Wrong password" });
    }

    // Generate a new token for the user
    const token = jwt.sign(
      { userId: foundUser._id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Update the user document with the new token
    await User.findByIdAndUpdate(foundUser._id, { accessToken: token });

    const {
      password: userPassword,
      __v,
      ...userDetails
    } = foundUser.toObject();

    console.log("Current User:", userDetails);
    console.log("Token:", token);

    // Store the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      // other options like secure, sameSite, etc. can be added based on your needs
    });

    res.json({ user: userDetails });
  } catch (err) {
    next(err);
  }
});

authRouter.get("/auth/verify", isAuthenticated, (req, res) => {
  res.json(req.user);
});

authRouter.post("/logout", isAuthenticated, (req, res) => {
  try {
    // Clear the HTTP-only cookie on the client side
    res.clearCookie("token");

    // Additional actions can be performed here before or after removing the token

    // Send a response indicating successful logout
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = authRouter;

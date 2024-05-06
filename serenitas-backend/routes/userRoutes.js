const express = require("express");
const app = express();
const router = express.Router();
const { verifyToken } = require("../authMiddleware");
const User = require("../models/User");
const mongoose = require("mongoose");

app.get("/dashboard", (req, res) => {
  res.send("/dashboard");
});

module.exports = app;

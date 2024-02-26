const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  res.send("User registration route");
});

router.post("/login", (req, res) => {
  res.send("User login route");
});

module.exports = router;

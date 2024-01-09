const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.get("/", async (req, res, next) => {
  try {
    console.log("Request Headers:", req.headers);

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      console.error("Authorization header missing");
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken);

    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    console.log("Fetched User:", user);

    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE route to delete a project
router.delete("/projects/:projectId", async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      console.error("Authorization header missing");
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken);

    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    console.log("Fetched User:", user);

    const projectId = req.params.projectId;

    // Implement logic to find and remove the project from the user's projects array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { projects: { _id: projectId } } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

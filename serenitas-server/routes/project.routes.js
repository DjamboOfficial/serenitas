const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.post("/projects", async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const userId = decodedToken.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assuming the project data is sent in the request body
    const { title, description } = req.body;

    // Create a new project
    const project = new Project({
      title,
      description,
      createdBy: userId,
      // Add other fields as needed
    });

    // Save the project to the database
    await project.save();

    // Add the new project to the user's projects array
    user.projects.push(project._id);
    await user.save();

    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

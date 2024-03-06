const express = require("express");
const router = express.Router();
const { verifyToken } = require("../authMiddleware");
const User = require("../models/User");

// GET route to fetch user's projects
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      message: "Protected route accessed",
      projects: user.projects,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT route to add a new project to user's projects
router.put("/:id/projects", async (req, res) => {
  try {
    const userId = req.params.id;
    const projectData = req.body; // Assuming project data is sent in the request body

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new project to the user's projects array
    user.projects.push(projectData);

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Project added successfully", user });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:userId/projects/:projectName", async (req, res) => {
  try {
    const userId = req.params.userId;
    const projectName = req.params.projectName;
    const projectData = req.body; // New project data to update

    console.log("User ID:", userId);
    console.log("Project Name:", projectName);
    console.log("Project Data:", projectData);

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    // Find the project by name
    const project = user.projects.find(
      (project) => project.name === projectName
    );
    if (!project) {
      console.log("Project not found");
      return res.status(404).json({ message: "Project not found" });
    }

    // Update the project
    Object.assign(project, projectData);

    // Save the updated user document
    await user.save();

    console.log("Project updated successfully");

    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:userId/projects/:projectId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const projectId = req.params.projectId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out the project to be deleted
    user.projects = user.projects.filter(
      (project) => project._id !== projectId
    );

    // Save the updated user document
    await user.save();

    res.status(200).json({ message: "Project deleted successfully", user });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

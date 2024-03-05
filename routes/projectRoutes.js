const express = require("express");
const router = express.Router();
const { verifyToken } = require("../authMiddleware");
const User = require("../models/User");

router.get("/", verifyToken, (req, res) => {
  const user = req.user;
  res.json({ message: "Protected route accessed", projects: user.projects });
});

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

router.put("/:userId/projects/:projectId", verifyToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    const projectId = req.params.projectId;
    console.log("Received userId:", userId);
    console.log("Received projectId:", projectId);

    const newStatus = req.body.status;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the project within the user's projects array and update its status
    const projectIndex = user.projects.findIndex(
      (project) => project._id === projectId
    );
    if (projectIndex === -1) {
      return res.status(404).json({ message: "Project not found" });
    }

    user.projects[projectIndex].status = newStatus;

    // Save the updated user document
    await user.save();

    res.status(200).json({
      message: "Project status updated successfully",
      updatedProject: user.projects[projectIndex],
    });
  } catch (error) {
    console.error("Error updating project status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;

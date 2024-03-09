const express = require("express");
const router = express.Router();
const { verifyToken } = require("../authMiddleware");
const User = require("../models/User");
const mongoose = require("mongoose");

// GET route to fetch user's projects
router.get("/projects", verifyToken, async (req, res) => {
  try {
    const { user } = req;
    const { projects } = await User.findById(user._id, "projects");
    res.json({ message: "You're now in the Netherrealm", projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/projects/new", verifyToken, async (req, res) => {
  try {
    const { user } = req;
    const { name, status } = req.body;

    // Create a new project
    const newProject = { name, status };
    user.projects.push(newProject);
    await user.save();
    const allProjects = user.projects;

    res.json({
      message: "Project created successfully",
      project: newProject,
      projects: allProjects,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/projects/update/:projectId", verifyToken, async (req, res) => {
  try {
    const { user } = req;
    const projectId = new mongoose.Types.ObjectId(req.params.projectId);
    const { name, status } = req.body;

    // Update the project details
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id, "projects._id": projectId },
      { $set: { "projects.$.name": name, "projects.$.status": status } },
      { new: true }
    );

    if (!updatedUser) {
      console.log("Project not found");
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      message: "Project updated successfully",
      project: updatedUser.projects.find((project) =>
        project._id.equals(projectId)
      ),
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/project/:projectId", verifyToken, async (req, res) => {
  try {
    const { user } = req;
    const projectId = req.params.projectId;

    console.log("Received project ID for deletion:", projectId);
    console.log("Received user:", user);

    // Find the index of the project to delete
    const projectIndex = user.projects.findIndex(
      (project) => project._id.toString() === projectId
    );

    // If project not found, return 404
    if (projectIndex === -1) {
      console.log("Project not found");
      return res.status(404).json({ message: "Project not found" });
    }

    // Remove the project from the user's projects array
    user.projects.splice(projectIndex, 1);
    await user.save();

    res.json({
      message: "Project deleted successfully",
      projects: user.projects,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

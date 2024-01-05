const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  // Define fields for the task model
  // ...
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tasks: [taskSchema], // Embed the task schema directly in the project schema
  // Add more fields as needed for your project model
});

const Project = mongoose.model("Project", projectSchema);

const userSchema = new mongoose.Schema({
  // Authentication Fields
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Profile Information
  name: { type: String },
  avatar: { type: String },

  // Task Management
  // tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }], // Remove this line
  projects: [projectSchema], // Embed the project schema directly

  // Session Tracking
  sessions: [
    {
      project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
      task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
      duration: { type: Number }, // Duration in minutes
      timestamp: { type: Date, default: Date.now },
    },
  ],

  // Authentication Tokens
  tokens: [{ type: String }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

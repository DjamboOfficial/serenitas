const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Authentication Fields
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Profile Information
  name: { type: String },
  avatar: { type: String },

  // Task Management
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],

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

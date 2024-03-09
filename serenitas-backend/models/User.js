const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  projects: [projectSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

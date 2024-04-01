const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
});

// Define indexes on projectSchema
projectSchema.index({ name: 1 }); // Index on the 'name' field

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  activityMinutes: { type: Number },
  projects: [projectSchema],
});

// Define indexes on userSchema
userSchema.index({ username: 1 }, { unique: true }); // Index on 'username' field with uniqueness constraint
userSchema.index({ email: 1 }, { unique: true }); // Index on 'email' field with uniqueness constraint

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  projects: [
    {
      name: String,
      status: String, // Define the status type as needed, e.g., 'active', 'inactive', 'completed', etc.
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

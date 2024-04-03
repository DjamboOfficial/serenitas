const express = require("express");
const app = express();
const User = require("../models/User");

app.get("/stats", async (req, res) => {
  try {
    const activityData = await calculateActivityMinutes();
    res.json(activityData);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Internal error" });
  }
});

async function calculateActivityMinutes() {
  try {
    const mostActiveUsers = await User.find()
      .sort({ activityMinutes: -1 })
      .limit(3);
    const activityData = mostActiveUsers.map((whatever) => ({
      userId: whatever.username,
      activityMinutes: whatever.activityMinutes,
    }));
    return activityData;
  } catch (error) {
    throw error;
  }
}

module.exports = app;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes"); // Fix the path
const projectRoutes = require("./routes/project.routes");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/serenitas");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("api/user/projects", projectRoutes);

module.exports = app;

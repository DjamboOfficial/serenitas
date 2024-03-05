require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connectToDatabase = require("./db");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 3000;
const cors = require("cors");
connectToDatabase();
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the serenitas backend");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port`);
});

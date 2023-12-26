const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();
require("./db");

app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
  origin: "http://localhost:5173",
};

app.get("/", (req, res) => {
  res.send("Welcome to the serenitas server!");
});

const AuthRoutes = require("./routes/auth.routes");
app.use("/auth", AuthRoutes);

app.post("/api/data", (req, res) => {
  const clientData = req.body;
  console.log("Received data from the client", clientData);
  res.json({ status: "success", message: "Data received" });
});

module.exports = app;

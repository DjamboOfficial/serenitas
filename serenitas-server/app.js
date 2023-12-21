const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Serenitas server!");
});

app.post("/api/data", (req, res) => {
  const clientData = req.body;
  console.log("Received data from the client", clientData);
  res.json({ status: "success", message: "Data received" });
});

module.exports = app;

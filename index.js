// server.js
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const lead = req.query;

//   // Log to file (optional)
//   fs.appendFileSync("leads.log", JSON.stringify(lead) + "\n");

  res.send(JSON.stringify(lead));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

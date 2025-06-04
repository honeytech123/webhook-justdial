// server.js
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api.routes.cjs");
const port = process.env.PORT || 3000;

//initialize express to the variable app
const app = express();

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

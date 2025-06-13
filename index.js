// server.js
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.routes.js"; 
import { initializeZoho } from "../init/initializer.js";

const port = process.env.PORT || 3000;

// Authenticate and initialize Zoho crm
await initializeZoho();

// initialize express to the variable app
const app = express();

// middlewares
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

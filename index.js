// server.js
const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api.routes");
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

// app.get("/leads", (req, res) => {
//   const lead = req.query;

// Justdial_Id: lead.leadid || "",
//       Lead_Type: lead.leadtype || "",
//       First_Name: `${lead.prefix || "null"}. ${lead.name || "null"}`,
//       Last_Name: "Doe",
//       Mobile: lead.mobile || "",
//       Phone: lead.phone || "",
//       Email: lead.email || "",
//       indiamartleadsofficialpluginforrealtimeleads__Lead_Push_Time: `${
//         lead.date || "0000/00/00"
//       } ${lead.time || "00:00:00"}`,
//       Date: lead.date || "",
//       Category: lead.category || "",
//       City: lead.city || "",
//       Street: lead.Area || "",
//       Branch_Area: lead.brancharea || "",
//       DND:
//         lead.dncmobile === 0
//           ? "Call now"
//           : lead.dncmobile == ""
//           ? ""
//           : "Do not Disturb",
//       Company_Name: lead.company || "",
//       Zip_Code: lead.pincode || "",
//       Branch_Id: lead.branchpin || "",
//       Parent_Id: lead.parentid || "",
//       Lead_Source: "JD",
  

//   if (Object.entries(lead).length > 0) {
//     axios
//       .post("https://www.zohoapis.in/crm/v8/Leads", finalData, {
//         headers: {
//           Authorization:
//             "Zoho-oauthtoken 1000.4f809effad61b9b38218f424cd3d7c26.6c21dcc217732c8beba3fbee2d506f2e",
//           "Content-Type": "application/json",
//         },
//       })
//       .then((response) => {
//         console.log("Response:", response.data);
//         res.send("Success");
//       })
//       .catch((error) => {
//         console.error(
//           "Error:",
//           error.response ? error.response.data : error.message
//         );
//         res.send("Failed");
//       });
//   }
// });

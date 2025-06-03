// server.js
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/lead", (req, res) => {
  const lead = req.query;

  const data = [
    {
      Justdial_Id: lead.leadid || "",
      Lead_Type: lead.leadtype || "",
      First_Name: `${lead.prefix || "null"}. ${lead.name || "null"}`,
      Last_Name: "Doe",
      Mobile: lead.mobile || "",
      Phone: lead.phone || "",
      Email: lead.email || "",
      indiamartleadsofficialpluginforrealtimeleads__Lead_Push_Time: `${
        lead.date || "0000/00/00"
      } ${lead.time || "00:00:00"}`,
      Date: lead.date || "",
      Category: lead.category || "",
      City: lead.city || "",
      Street: lead.Area || "",
      Branch_Area: lead.brancharea || "",
      DND:
        lead.dncmobile === 0
          ? "Call now"
          : lead.dncmobile == ""
          ? ""
          : "Do not Disturb",
      Company_Name: lead.company || "",
      Zip_Code: lead.pincode || "",
      Branch_Id: lead.branchpin || "",
      Parent_Id: lead.parentid || "",
      Lead_Source: "JD",
    },
  ];

  const finalData = JSON.stringify({ data: data });

  if (Object.entries(lead).length > 0) {
    axios
      .post("https://www.zohoapis.in/crm/v8/Leads", finalData, {
        headers: {
          Authorization:
            "Bearer 1000.3bcff2ee0e25a5603c574dbebac34fdf.722963df93d11d2b28bc41a02d740056",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        res.send("Success");
      })
      .catch((error) => {
        console.error(
          error.response
            ? error.response.data.Error.data[0].details
            : error.message
        );

        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        res.send("Failed");
      });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

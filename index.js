// server.js
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const lead = req.query;
  function sendReq() {
    alert("hello world");
  }

//   axios
//     .post("https://www.zohoapis.com/crm/v8/Leads", data, {
//       headers: {
//         Authorization:
//           "Zoho-oauthtoken 1000.8cb99dxxxxxxxxxxxxx9be93.9b8xxxxxxxxxxxxxxxf",
//         "Content-Type": "application/json",
//       },
//     })
//     .then((response) => {
//       console.log("Response:", response.data);
//     })
//     .catch((error) => {
//       console.error(
//         "Error:",
//         error.response ? error.response.data : error.message
//       );
//     });

res.write(JSON.stringify(lead));
res.write(`<br><br><br><button onclick=${sendReq()}>send</button>`);
res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

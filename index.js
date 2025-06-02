// server.js
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const lead = req.query;

  // Send HTML with embedded JavaScript
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Lead Viewer</title>
      </head>
      <body>
        <h2>Lead Data:</h2>
        <pre>${JSON.stringify(lead, null, 2)}</pre>
        
        <button onclick="sendReq()">Send</button>

        <script>
          function sendReq() {
            alert("Hello, world!");
            // You could also send an axios/fetch request here if needed
          }
        </script>
      </body>
    </html>
  `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

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

//   res.send(
//       `${JSON.stringify(lead)}<br><br><br><button onclick=${sendReq}>send</button>`
//   );
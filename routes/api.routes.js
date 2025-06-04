const express = require("express");
const router = express.Router();
const LeadController = require("../controller/pushLead.controller");

router.get("/leads", LeadController.pushLead);

module.exports = router;
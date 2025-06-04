const express = require("express");
const router = express.Router();
const LeadController = require("../controller/pushLead.controller.cjs");

router.get("/leads", LeadController.pushLead);

module.exports = router;
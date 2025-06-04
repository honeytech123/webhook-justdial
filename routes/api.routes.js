import express from "express";
import { pushLead } from "../controller/pushLead.controller.js";

const router = express.Router();

router.get("/leads", pushLead);

export default router;

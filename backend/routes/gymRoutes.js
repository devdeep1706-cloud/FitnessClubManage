import express from "express";
import { findGymsByPincode } from "../controllers/gymController.js";

const router = express.Router();

router.post("/check", findGymsByPincode);

export default router;
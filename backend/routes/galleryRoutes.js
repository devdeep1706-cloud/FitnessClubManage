import express from "express";
import { getGallery, addImage, deleteImage } from "../controllers/galleryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", getGallery); // Public
router.post("/", authMiddleware, adminMiddleware, addImage); // Admin Only
router.delete("/:id", authMiddleware, adminMiddleware, deleteImage); // Admin Only

export default router;
import express from "express";
import { createPurchase ,deletePurchase,getAllPurchases} from "../controllers/purchaseController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPurchase);
router.delete("/:id", authMiddleware, deletePurchase);
router.get("/", authMiddleware, adminMiddleware, getAllPurchases);

export default router;
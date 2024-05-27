import { Router } from "express";
import { createPurchase } from "../controller/purchases";
import { authMiddleware } from "../middleware/authentication";

const router = Router();

router.post("/purchase", authMiddleware, createPurchase);

export { router as purchaseRoutes };

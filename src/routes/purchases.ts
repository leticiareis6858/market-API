import { Router } from "express";
import { createPurchase } from "../controller/purchases";
import { authMiddleware, verifyRoles } from "../middleware/authentication";

const router = Router();

//create purchase:
router.post(
  "/purchase",
  authMiddleware,
  verifyRoles("cashier"),
  createPurchase
);

export { router as purchaseRoutes };

import { Router } from "express";
import { createPurchase, deletePurchase } from "../controller/purchases";
import { authMiddleware, verifyRoles } from "../middleware/authentication";

const router = Router();

//create purchase:
router.post(
  "/purchase/create",
  authMiddleware,
  verifyRoles("admin", "cashier"),
  createPurchase
);

//delete purchase:
router.delete(
  "/purchase/delete/:id",
  authMiddleware,
  verifyRoles("admin", "manager", "cashier"),
  deletePurchase
);

export { router as purchaseRoutes };

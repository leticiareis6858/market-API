import { Router } from "express";
import {
  createPurchase,
  deletePurchase,
  getAllPurchases,
  getPurchasesProfit,
} from "../controller/purchases";
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

//get all purchases:
router.get(
  "/purchase/all",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getAllPurchases
);

router.get(
  "/purchase/profit",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getPurchasesProfit
);

export { router as purchaseRoutes };

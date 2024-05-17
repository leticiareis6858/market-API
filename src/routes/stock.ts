import { authMiddleware, verifyRoles } from "../middleware/authentication";
import express from "express";
import {
  getStockByProductName,
  getTotalProductsInStock,
  getTotalStockProfit,
} from "../controller/stock";

const router = express.Router();

router.get(
  "/stock/total",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getTotalProductsInStock
);
router.get(
  "/stock/total-profit",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getTotalStockProfit
);
router.get(
  "/stock/total-by-product",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getStockByProductName
);

export { router as stockRoutes };

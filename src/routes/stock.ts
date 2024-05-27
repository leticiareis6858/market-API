import { authMiddleware, verifyRoles } from "../middleware/authentication";
import express from "express";
import {
  getStockByProductName,
  getTotalProductsInStock,
  getTotalStockProfit,
} from "../controller/stock";

const router = express.Router();

//get total of products in stock:
router.get(
  "/stock/total",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getTotalProductsInStock
);

//get total profit of stock:
router.get(
  "/stock/total-profit",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getTotalStockProfit
);

//get total of products in stock by product name:
router.get(
  "/stock/total-by-product",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getStockByProductName
);

export { router as stockRoutes };

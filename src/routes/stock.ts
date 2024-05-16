import express from "express";
import {
  getStockByProductName,
  getTotalProductsInStock,
  getTotalStockProfit,
} from "../controller/stock";

const router = express.Router();

router.get("/stock/total", getTotalProductsInStock);
router.get("/stock/total-profit", getTotalStockProfit);
router.get("/stock/total-by-product", getStockByProductName);

export { router as stockRoutes };

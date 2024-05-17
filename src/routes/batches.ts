import { authMiddleware, verifyRoles } from "../middleware/authentication";
import express from "express";
const router = express.Router();

import {
  createBatch,
  getAllBatches,
  getBatchById,
  updateAllBatchInfo,
  updateBatchProductName,
  updateBatchExpirationDate,
  deleteBatch,
  updateBatchUnitBuyingPrice,
  updateBatchUnitSellingPrice,
  getBatchProfit,
} from "../controller/batches";

router.post(
  "/products_batch",
  authMiddleware,
  verifyRoles("admin", "manager"),
  createBatch
);

router.get(
  "/products_batch",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getAllBatches
);

router.get(
  "/products_batch/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getBatchById
);

router.put(
  "/products_batch/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateAllBatchInfo
);

router.delete(
  "/products_batch/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  deleteBatch
);

router.patch(
  "/products_batch/:id/product_name",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateBatchProductName
);

router.patch(
  "/products_batch/:id/expiration_date",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateBatchExpirationDate
);

router.patch(
  "/products_batch/:id/unit_buying_price",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateBatchUnitBuyingPrice
);

router.patch(
  "/products_batch/:id/unit_selling_price",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateBatchUnitSellingPrice
);

router.get(
  "/products_batch/:id/profit",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getBatchProfit
);

export { router as batchesRoutes };

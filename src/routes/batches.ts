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

//create batch:
router.post(
  "/products_batch",
  authMiddleware,
  verifyRoles("admin", "manager"),
  createBatch
);

//get all batches:
router.get(
  "/products_batch",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getAllBatches
);

//get batch by id:
router.get(
  "/products_batch/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getBatchById
);

//get all batch info:
router.put(
  "/products_batch/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateAllBatchInfo
);

//delete batch:
router.delete(
  "/products_batch/:id",
  authMiddleware,
  verifyRoles("admin", "manager"),
  deleteBatch
);

//update the name of the product in the batch:
router.patch(
  "/products_batch/:id/product_name",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateBatchProductName
);

//update the expiration date of the product in the batch:
router.patch(
  "/products_batch/:id/expiration_date",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateBatchExpirationDate
);

//update the product's unit buying price in the batch:
router.patch(
  "/products_batch/:id/unit_buying_price",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateBatchUnitBuyingPrice
);

//update the product's unit selling price in the batch:
router.patch(
  "/products_batch/:id/unit_selling_price",
  authMiddleware,
  verifyRoles("admin", "manager"),
  updateBatchUnitSellingPrice
);

//get the profit of the batch:
router.get(
  "/products_batch/:id/profit",
  authMiddleware,
  verifyRoles("admin", "manager"),
  getBatchProfit
);

export { router as batchesRoutes };

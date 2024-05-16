import { Router } from "express";
const router = Router();

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
} from "../controller/batches";

router.route("/products_batch").post(createBatch).get(getAllBatches);
router
  .route("/products_batch/:id")
  .get(getBatchById)
  .put(updateAllBatchInfo)
  .delete(deleteBatch);
router.route("/products_batch/:id/product_name").patch(updateBatchProductName);
router
  .route("/products_batch/:id/expiration_date")
  .patch(updateBatchExpirationDate);
router
  .route("/products_batch/:id/unit_buying_price")
  .patch(updateBatchUnitBuyingPrice);
router
  .route("/products_batch/:id/unit_selling_price")
  .patch(updateBatchUnitSellingPrice);

export { router as batchesRoutes };

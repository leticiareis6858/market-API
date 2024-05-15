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

export { router as batchesRoutes };

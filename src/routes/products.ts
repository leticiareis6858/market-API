import { authMiddleware, verifyRoles } from "../middleware/authentication";
import express from "express";
import {
  getAllProducts,
  getAllProductsFromBatch,
  getProductById,
  getProductsByName,
} from "../controller/products";

const router = express.Router();

// get all products in stock
router.get(
  "/stock/products/total",
  authMiddleware,
  verifyRoles("admin", "stocker"),
  getAllProducts
);

// get all products in stock by batch id
router.get(
  "/stock/products/total/:batch_id",
  authMiddleware,
  verifyRoles("admin", "stocker"),
  getAllProductsFromBatch
);

// get product by id
router.get(
  "/stock/products/:id",
  authMiddleware,
  verifyRoles("admin", "stocker"),
  getProductById
);

// get products by name
router.get(
  "/stock/products/name",
  authMiddleware,
  verifyRoles("admin", "stocker"),
  getProductsByName
);

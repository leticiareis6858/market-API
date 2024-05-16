import express from "express";
import { getTotalProductsInStock } from "../controller/products";

const router = express.Router();

router.get("/products/total", getTotalProductsInStock);

export { router as productsRoutes };

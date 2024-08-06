import { Request, Response } from "express";
import {
  getsAllProducts,
  getsAllProductsFromBatch,
  getsProductById,
  getsProductsByName,
} from "../model/products";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await getsAllProducts();
    res.status(200).json({ products });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting products. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getAllProductsFromBatch = async (req: Request, res: Response) => {
  try {
    const batch_id = req.params;
    const products = await getsAllProductsFromBatch(Number(batch_id));
    res.status(200).json({ products });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting products. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getsProductById(Number(id));
    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting product. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getProductsByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      throw new Error("Invalid input. 'name' must be a non-empty string.");
    }

    const products = await getsProductsByName(name);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting products. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

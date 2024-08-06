import { Request, Response } from "express";
import {
  getsTotalProducts,
  getsTotalProfit,
  getsTotalProductsByName,
} from "../model/products";

export const getTotalProductsInStock = async (req: Request, res: Response) => {
  try {
    const totalProducts = await getsTotalProducts();
    res.status(200).json({ "Total of products in stock": totalProducts });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting total products in stock. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getTotalStockProfit = async (req: Request, res: Response) => {
  try {
    const totalProfit = await getsTotalProfit();
    res.status(200).json({ msg: `Total profit: $${totalProfit}` });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting total profit. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getStockByProductName = async (req: Request, res: Response) => {
  try {
    const itemsByProductName = await getsTotalProductsByName();
    res.status(200).json({ itemsByProductName });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting total products in stock. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

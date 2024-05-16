import { Request, Response } from "express";
import { getTotalProducts } from "../model/products";

export const getTotalProductsInStock = async (req: Request, res: Response) => {
  try {
    const totalProducts = await getTotalProducts();
    res.status(200).json({ "Total of products in stock": totalProducts });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting total products in stock. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

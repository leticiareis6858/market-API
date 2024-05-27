import { Request, Response } from "express";
import { createsPurchase } from "../model/purchases";

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { client_id, cashier_id, products } = req.body;
    const newPurchase = await createsPurchase(client_id, cashier_id, products);
    res.status(201).json({ msg: "Purchase created!", purchase: newPurchase });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while creating purchase. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

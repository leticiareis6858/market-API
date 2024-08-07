import { Request, Response } from "express";
import { createsPurchase, deletesPurchase } from "../model/purchases";

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { cashier_id, products } = req.body;
    const newPurchase = await createsPurchase(cashier_id, products);
    res.status(201).json({ msg: "Purchase created!", purchase: newPurchase });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while creating purchase. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const deletePurchase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const purchase_id = Number(id);
    await deletesPurchase(purchase_id);
    res.status(200).json({ msg: "Purchase deleted!" });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while deleting purchase. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

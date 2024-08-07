import { Request, Response } from "express";
import {
  createsPurchase,
  deletesPurchase,
  getsAllPurchases,
  getsPurchasesProfit,
  getsPurchaseById,
  updatesPurchaseCashier,
  updatesPurchaseProducts,
} from "../model/purchases";

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

export const getAllPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await getsAllPurchases();
    res.status(200).json({ purchases });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting purchases. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getPurchasesProfit = async (req: Request, res: Response) => {
  try {
    const totalProfit = await getsPurchasesProfit();
    res.status(200).json({ msg: `Total profit: $${totalProfit}` });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting purchases profit. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const purchase_id = Number(id);
    const purchase = await getsPurchaseById(purchase_id);
    res.status(200).json({ purchase });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting purchase. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const updatePurchaseCashier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cashier_id } = req.body;
    const purchase_id = Number(id);
    const updatedPurchase = await updatesPurchaseCashier(
      purchase_id,
      cashier_id
    );
    res
      .status(200)
      .json({ msg: "Purchase cashier updated!", purchase: updatedPurchase });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating purchase cashier. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const updatePurchaseProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { products } = req.body;
    const purchase_id = Number(id);
    const updatedPurchase = await updatesPurchaseProducts(
      purchase_id,
      products
    );
    res
      .status(200)
      .json({ msg: "Purchase products updated!", purchase: updatedPurchase });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating purchase products. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

import { Request, Response } from "express";
import {
  createsBatch,
  getsAllBatches,
  getsBatchById,
  updatesAllBatchInfo,
  updatesBatchProductName,
  updatesBatchExpirationDate,
  updatesBatchUnitBuyingPrice,
  updatesBatchUnitSellingPrice,
  deletesBatch,
  getsBatchProfit,
} from "../model/batches";

export const createBatch = async (req: Request, res: Response) => {
  try {
    const {
      product_name,
      unit_buying_price,
      unit_selling_price,
      expiration_date,
      quantity,
    } = req.body;
    const newBatch = await createsBatch(
      product_name,
      unit_buying_price,
      unit_selling_price,
      expiration_date,
      quantity
    );
    res.status(201).json({ msg: "Batch created!", batch: newBatch });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while creating batch. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getAllBatches = async (req: Request, res: Response) => {
  try {
    const batches = await getsAllBatches();
    res.status(200).json(batches);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting all batches. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getBatchById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const batch = await getsBatchById(Number(id));
    res.status(200).json(batch);
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting batch by id. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const updateAllBatchInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      product_name,
      unit_buying_price,
      unit_selling_price,
      expiration_date,
    } = req.body;
    await updatesAllBatchInfo(
      Number(id),
      product_name,
      unit_buying_price,
      unit_selling_price,
      expiration_date
    );
    res.status(200).json({ msg: "Batch updated!" });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating batch. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const updateBatchProductName = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { product_name } = req.body;
    await updatesBatchProductName(Number(id), product_name);
    res.status(200).json({ msg: "Batch updated!" });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating batch. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const updateBatchExpirationDate = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { expiration_date } = req.body;
    await updatesBatchExpirationDate(Number(id), expiration_date);
    res.status(200).json({ msg: "Batch updated!" });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating batch. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const updateBatchUnitBuyingPrice = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { unit_buying_price } = req.body;
    await updatesBatchUnitBuyingPrice(Number(id), unit_buying_price);
    res.status(200).json({ msg: "Product unit buying price updated!" });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating product unit buying price. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const updateBatchUnitSellingPrice = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { unit_selling_price } = req.body;
    await updatesBatchUnitSellingPrice(Number(id), unit_selling_price);
    res.status(200).json({ msg: "Product unit selling price updated!" });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while updating product unit selling price. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const deleteBatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deletesBatch(Number(id));
    res.status(200).json({ msg: "Batch deleted!" });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while deleting batch. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

export const getBatchProfit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profit = await getsBatchProfit(Number(id));
    res.status(200).json({ msg: `Batch profit is: $${profit}` });
  } catch (error: any) {
    res.status(500).json({
      msg: "Error while getting batch profit. Please, try again.",
      error: error.message || "Unknown error",
    });
  }
};

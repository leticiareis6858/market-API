import { Request, Response } from "express";
import {
  createsBatch,
  getsAllBatches,
  getsBatchById,
  updatesAllBatchInfo,
  updatesBatchProductName,
  updatesBatchExpirationDate,
  deletesBatch,
} from "../model/batches";

export const createBatch = async (req: Request, res: Response) => {
  try {
    const { product_name, expiration_date } = req.body;
    const newBatch = await createsBatch(product_name, expiration_date);
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
    const { product_name, expiration_date } = req.body;
    await updatesAllBatchInfo(Number(id), product_name, expiration_date);
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

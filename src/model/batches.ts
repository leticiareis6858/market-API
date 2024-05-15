import pool from "../db/pool";
import { IProduct } from "./products";

interface IBatch {
  id: number;
  products: IProduct[];
  creation_date: Date;
}

export const createBatch = async (products: IProduct[]): Promise<IBatch> => {
  const querytText =
    "INSERT INTO product-batches (products, creation_date) VALUES ($1, CURRENT_TIMESTAMP) RETURNING *";
  const { rows } = await pool.query(querytText, [products]);
  return rows[0];
};

export const getAllBatches = async (): Promise<IBatch[]> => {
  const { rows } = await pool.query("SELECT * FROM product-batches");
  return rows;
};

export const getBatchById = async (id: number): Promise<IBatch> => {
  const { rows } = await pool.query(
    "SELECT * FROM product-batches WHERE id = $1"
  );
  return rows[0];
};

export const deleteBatch = async (id: number): Promise<void> => {
  const queryText = "DELETE FROM product-batches WHERE id = $1";
  await pool.query(queryText, [id]);
};

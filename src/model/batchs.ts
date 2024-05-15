import pool from "../db/pool";
import { IProduct } from "./products"; // Import the Product interface or class from the appropriate file

interface IBatch {
  id: number;
  products: IProduct[];
  creation_date: Date;
}

export const createBatch = async (products: IProduct[]): Promise<IBatch> => {
  const querytText =
    "INSERT INTO product-batchs (products, creation_date) VALUES ($1, CURRENT_TIMESTAMP) RETURNING *";
  const { rows } = await pool.query(querytText, [products]);
  return rows[0];
};

export const getAllBatchs = async (): Promise<IBatch[]> => {
  const { rows } = await pool.query("SELECT * FROM product-batchs");
  return rows;
};

export const getBatchById = async (id: number): Promise<IBatch> => {
  const { rows } = await pool.query(
    "SELECT * FROM product-batchs WHERE id = $1"
  );
  return rows[0];
};

export const deleteBatch = async (id: number): Promise<void> => {
  const queryText = "DELETE FROM product-batchs WHERE id = $1";
  await pool.query(queryText, [id]);
};

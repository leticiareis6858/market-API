import pool from "../db/pool";
import { IProduct } from "./products";

export interface IBatch {
  id: number;
  product_name: string;
  unit_buying_price: number;
  unit_selling_price: number;
  creation_date: Date;
  expiration_date: Date;
  products: IProduct[];
}

export const createsBatch = async (
  product_name: string,
  unit_buying_price: number,
  unit_selling_price: number,
  expiration_date: Date,
  quantity: number
): Promise<IBatch> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const batchResult = await client.query(
      "INSERT INTO product_batches (product_name, unit_buying_price, unit_selling_price, creation_date, expiration_date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4) RETURNING *",
      [product_name, unit_buying_price, unit_selling_price, expiration_date]
    );
    const batch = batchResult.rows[0];

    const products: IProduct[] = [];
    for (let i = 0; i < quantity; i++) {
      const productResult = await client.query(
        "INSERT INTO products (name, unit_buying_price, unit_selling_price, expiration_date, batch_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          product_name,
          unit_buying_price,
          unit_selling_price,
          expiration_date,
          batch.id,
        ]
      );
      const product = productResult.rows[0];
      products.push(product);
    }
    await client.query("COMMIT");
    return { ...batch, products };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getsAllBatches = async (): Promise<IBatch[]> => {
  const { rows } = await pool.query("SELECT * FROM product_batches");
  return rows;
};

export const getsBatchById = async (id: number): Promise<IBatch> => {
  const { rows } = await pool.query(
    "SELECT * FROM product_batches WHERE id = $1",
    [id]
  );
  return rows[0];
};

export const updatesAllBatchInfo = async (
  id: number,
  product_name: string,
  unit_buying_price: number,
  unit_selling_price: number,
  expiration_date: Date
): Promise<IBatch> => {
  const queryText =
    "UPDATE product_batches SET product_name=$2, unit_buying_price=$3, unit_selling_price=$4, expiration_date=$5 WHERE id=$1 RETURNING *";
  const { rows } = await pool.query(queryText, [
    id,
    product_name,
    unit_buying_price,
    unit_selling_price,
    expiration_date,
  ]);
  return rows[0];
};

export const updatesBatchProductName = async (
  id: number,
  product_name: string
): Promise<IBatch> => {
  const queryText =
    "UPDATE product_batches SET product_name=$1 WHERE id=$2 RETURNING *";
  const { rows } = await pool.query(queryText, [product_name, id]);
  return rows[0];
};

export const updatesBatchExpirationDate = async (
  id: number,
  expiration_date: Date
): Promise<IBatch> => {
  const queryText =
    "UPDATE product_batches SET expiration_date=$1 WHERE id=$2 RETURNING *";
  const { rows } = await pool.query(queryText, [expiration_date, id]);
  return rows[0];
};

export const updatesBatchUnitBuyingPrice = async (
  id: number,
  unit_buying_price: number
): Promise<IBatch> => {
  const queryText =
    "UPDATE product_batches SET unit_buying_price=$1 WHERE id=$2 RETURNING *";
  const { rows } = await pool.query(queryText, [unit_buying_price, id]);
  return rows[0];
};

export const updatesBatchUnitSellingPrice = async (
  id: number,
  unit_selling_price: number
): Promise<IBatch> => {
  const queryText =
    "UPDATE product_batches SET unit_selling_price=$1 WHERE id=$2 RETURNING *";
  const { rows } = await pool.query(queryText, [unit_selling_price, id]);
  return rows[0];
};

export const deletesBatch = async (id: number): Promise<void> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const deleteProductsQueryText = "DELETE FROM products WHERE batch_id=$1";
    await client.query(deleteProductsQueryText, [id]);

    const deleteBatchQueryText = "DELETE FROM product_batches WHERE id=$1";
    await client.query(deleteBatchQueryText, [id]);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export const getsBatchProfit = async (batchId: number): Promise<number> => {
  const queryText =
    "SELECT SUM(unit_selling_price) AS total_selling_price, SUM(unit_buying_price) AS total_buying_price, COUNT(*) AS total_products FROM products WHERE batch_id = $1 ";
  const { rows } = await pool.query(queryText, [batchId]);
  const { total_selling_price, total_buying_price, total_products } = rows[0];

  if (total_products === 0) {
    throw new Error("No products in batch");
  }

  const totalSellingPrice = parseFloat(total_selling_price);
  const totalBuyingPrice = parseFloat(total_buying_price);
  const profit = parseFloat((totalSellingPrice - totalBuyingPrice).toFixed(2));

  return profit;
};

import pool from "../db/pool";

export interface IBatch {
  id: number;
  product_name: string;
  creation_date: Date;
  expiration_date: Date;
}

export const createBatch = async (
  product_name: string,
  expiration_date: Date
): Promise<IBatch> => {
  const queryText =
    "INSERT INTO product_batches (product_name, creation_date, expiration_date) VALUES ($1, CURRENT_TIMESTAMP, $2) RETURNING *";
  const { rows } = await pool.query(queryText, [product_name, expiration_date]);
  return rows[0];
};

export const getAllBatches = async (): Promise<IBatch[]> => {
  const { rows } = await pool.query("SELECT * FROM product_batches");
  return rows;
};

export const getBatchById = async (id: number): Promise<IBatch> => {
  const { rows } = await pool.query(
    "SELECT * FROM product_batches WHERE id = $1",
    [id]
  );
  return rows[0];
};

export const deleteBatch = async (id: number): Promise<void> => {
  const queryText = "DELETE FROM product_batches WHERE id = $1";
  await pool.query(queryText, [id]);
};

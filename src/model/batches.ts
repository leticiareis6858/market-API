import pool from "../db/pool";

export interface IBatch {
  id: number;
  product_name: string;
  creation_date: Date;
  expiration_date: Date;
}

export const createsBatch = async (
  product_name: string,
  expiration_date: Date
): Promise<IBatch> => {
  const queryText =
    "INSERT INTO product_batches (product_name, creation_date, expiration_date) VALUES ($1, CURRENT_TIMESTAMP, $2) RETURNING *";
  const { rows } = await pool.query(queryText, [product_name, expiration_date]);
  return rows[0];
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
  expiration_date: Date
): Promise<IBatch> => {
  const queryText =
    "UPDATE product_batches SET product_name=$1,expiration_date=$2 WHERE id=$3 RETURNING *";
  const { rows } = await pool.query(queryText, [
    id,
    product_name,
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

export const deletesBatch = async (id: number): Promise<void> => {
  const queryText = "DELETE FROM product_batches WHERE id = $1";
  await pool.query(queryText, [id]);
};

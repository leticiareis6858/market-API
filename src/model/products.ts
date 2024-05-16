import pool from "../db/pool";

export interface IProduct {
  id: number;
  name: string;
  unit_buying_price: number;
  unit_selling_price: number;
  expiration_date: Date;
  batch_id: number;
}

export const createProduct = async (
  name: string,
  unit_buying_price: number,
  unit_selling_price: number,
  expiration_date: Date,
  batch_id: number
): Promise<IProduct> => {
  const queryText =
    "INSERT INTO products (name, unit_buying_price, unit_selling_price, expiration_date, batch_id) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const { rows } = await pool.query(queryText, [
    name,
    unit_buying_price,
    unit_selling_price,
    expiration_date,
    batch_id,
  ]);
  return rows[0];
};

export const getAllProducts = async (): Promise<IProduct[]> => {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows;
};

export const getProductsByName = async (name: string): Promise<IProduct[]> => {
  const { rows } = await pool.query("SELECT * FROM products WHERE name = $1", [
    name,
  ]);
  return rows;
};

export const getProductById = async (id: number): Promise<IProduct> => {
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
    id,
  ]);
  return rows[0];
};

export const updateProductName = async (
  id: number,
  name: string
): Promise<void> => {
  const queryText = "UPDATE products SET name = $2 WHERE id = $1";
  await pool.query(queryText, [id, name]);
};

export const updateProductExpirationDate = async (
  id: number,
  expiration_date: Date
): Promise<void> => {
  const queryText = "UPDATE products SET expiration_date = $2 WHERE id = $1";
  await pool.query(queryText, [id, expiration_date]);
};

export const updateProductBatch = async (
  id: number,
  batch_id: number
): Promise<void> => {
  const queryText = "UPDATE products SET batch_id = $2 WHERE id = $1";
  await pool.query(queryText, [id, batch_id]);
};

export const deleteProduct = async (id: number): Promise<void> => {
  const queryText = "DELETE FROM products WHERE id = $1";
  await pool.query(queryText, [id]);
};

export const getTotalProducts = async (): Promise<number> => {
  const queryText = "SELECT COUNT(*) FROM products";
  const { rows } = await pool.query(queryText);
  return parseInt(rows[0].count);
};

import pool from "../db/pool";

export interface IProduct {
  id: number;
  name: string;
  unit_buying_price: number;
  unit_selling_price: number;
  expiration_date: Date;
  batch_id: number;
}

export const createsProduct = async (
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

export const getsAllProducts = async (): Promise<IProduct[]> => {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows;
};

export const getsProductsByName = async (name: string): Promise<IProduct[]> => {
  if (!name || typeof name !== "string") {
    throw new Error("Invalid input. 'name' must be a non-empty string.");
  }

  const queryText = "SELECT * FROM products WHERE name ILIKE $1";
  const { rows } = await pool.query(queryText, [`%${name}%`]);
  return rows;
};

export const getsProductById = async (id: number): Promise<IProduct> => {
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
    id,
  ]);
  return rows[0];
};

export const updatesProductName = async (
  id: number,
  name: string
): Promise<void> => {
  const queryText = "UPDATE products SET name = $2 WHERE id = $1";
  await pool.query(queryText, [id, name]);
};

export const updatesProductExpirationDate = async (
  id: number,
  expiration_date: Date
): Promise<void> => {
  const queryText = "UPDATE products SET expiration_date = $2 WHERE id = $1";
  await pool.query(queryText, [id, expiration_date]);
};

export const updatesProductBatch = async (
  id: number,
  batch_id: number
): Promise<void> => {
  const queryText = "UPDATE products SET batch_id = $2 WHERE id = $1";
  await pool.query(queryText, [id, batch_id]);
};

export const deletesProduct = async (id: number): Promise<void> => {
  const queryText = "DELETE FROM products WHERE id = $1";
  await pool.query(queryText, [id]);
};

export const getsTotalProducts = async (): Promise<number> => {
  const queryText = "SELECT COUNT(*) FROM products";
  const { rows } = await pool.query(queryText);
  return parseInt(rows[0].count);
};

export const getsTotalProfit = async (): Promise<number> => {
  const queryText =
    "SELECT SUM(unit_selling_price) AS total_selling_price, SUM(unit_buying_price) AS total_buying_price FROM products";
  const { rows } = await pool.query(queryText);
  const { total_selling_price, total_buying_price } = rows[0];

  if (
    parseFloat(total_selling_price) === 0 ||
    parseFloat(total_buying_price) === 0
  ) {
    throw new Error("No products found or prices are equal to zero!");
  }

  const totalSellingPrice = parseFloat(total_selling_price);
  const totalBuyingPrice = parseFloat(total_buying_price);
  const totalProfit = parseFloat(
    (totalSellingPrice - totalBuyingPrice).toFixed(2)
  );

  return totalProfit;
};

export const getsTotalProductsByName = async (): Promise<
  { product_name: string; total: number }[]
> => {
  const queryText =
    "SELECT name AS product_name, COUNT(*) AS total_in_stock FROM products GROUP BY product_name";
  const { rows } = await pool.query(queryText);
  return rows;
};

export const getsAllProductsFromBatch = async (
  batch_id: number
): Promise<IProduct[]> => {
  const queryText = "SELECT * FROM products WHERE batch_id=$1";
  const { rows } = await pool.query(queryText, [batch_id]);
  return rows;
};

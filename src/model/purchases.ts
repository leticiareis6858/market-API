import pool from "../db/pool";

export interface IPurchase {
  id: number;
  client_id: number;
  cashier_id: number;
  products: number[];
  total_price: number;
}

export const createsPurchase = async (
  client_id: number,
  cashier_id: number,
  products: number[]
): Promise<IPurchase> => {
  const totalPriceQueryText =
    "SELECT SUM(unit_selling_price) FROM products WHERE id = ANY($1::int[])";
  const totalPriceResult = await pool.query(totalPriceQueryText, [products]);
  const total_price = totalPriceResult.rows[0].total_price;

  const purchaseQuertyText =
    "INSERT INTO purchases(client_id,cashier_id,total_price) VALUES($1,$2,$3) RETURNING *";
  const purchaseResult = await pool.query(purchaseQuertyText, [
    client_id,
    cashier_id,
    total_price,
  ]);
  const purchase_id = purchaseResult.rows[0].id;

  const purchasedProductsQueryText =
    "INSERT INTO purchased_products(purchase_id,product_id) SELECT $1, id FROM products WHERE id = ANY($2::int[])";
  await pool.query(purchasedProductsQueryText, [purchase_id, products]);

  const deleteProductsQuery = "DELETE FROM products WHERE id = ANY($1::int[])";
  await pool.query(deleteProductsQuery, [products]);

  return { id: purchase_id, client_id, cashier_id, products, total_price };
};

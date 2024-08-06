import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDB, disconnectFromDB } from "./db/connect";
import pool from "./db/pool";
import { batchesRoutes } from "./routes/batches";
import { stockRoutes } from "./routes/stock";
import { userRoutes } from "./routes/users";
import { purchaseRoutes } from "./routes/purchases";
import { productsRoutes } from "./routes/products";

const app = express();

app.use(express.json());

app.use(
  "/api-market",
  batchesRoutes,
  stockRoutes,
  userRoutes,
  purchaseRoutes,
  productsRoutes
);

dotenv.config();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Running...");
});

const port = process.env.PORT || 3000;

const createBatchesTable = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query(`
      SELECT EXISTS (
        SELECT 1 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'product_batches'
      )
    `);
    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      await client.query(`
      CREATE TABLE IF NOT EXISTS product_batches (
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(255) NOT NULL,
        unit_buying_price DECIMAL NOT NULL,
        unit_selling_price DECIMAL NOT NULL,
        creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expiration_date DATE NOT NULL
    );
      `);
      console.log("Product_batches table created!");
    } else {
      console.log("Product_batches table already exists!");
    }
  } catch (error) {
    console.error("Error while creating product_batches table", error);
  } finally {
    client.release();
  }
};

const createProductsTable = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'products')`
    );
    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      await client.query(`CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        unit_buying_price DECIMAL NOT NULL,
        unit_selling_price DECIMAL NOT NULL,
        expiration_date DATE NOT NULL,
        batch_id INTEGER NOT NULL,
        FOREIGN KEY (batch_id) REFERENCES product_batches(id)
    );`);
      console.log("Products table created!");
    } else {
      console.log("Products table already exists!");
    }
  } catch (error) {
    console.error("Error while creating products table", error);
  } finally {
    client.release();
  }
};

const createUserTable = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users')`
    );
    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      await client.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL
    );`);
      console.log("Users table created!");
    } else {
      console.log("Users table already exists!");
    }
  } catch (error) {
    console.error("Error while creating users table", error);
  } finally {
    client.release();
  }
};

const createPurchasesTable = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'purchases')`
    );
    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      await client.query(`CREATE TABLE IF NOT EXISTS purchases (
        id SERIAL PRIMARY KEY,
        cashier_id INTEGER NOT NULL,
        total_price DECIMAL NOT NULL,
        FOREIGN KEY (cashier_id) REFERENCES users(id)
      );`);
      console.log("Purchases table created!");
    } else {
      console.log("Purchases table already exists!");
    }
  } catch (error) {
    console.error("Error while creating purchases table", error);
  } finally {
    client.release();
  }
};

const createPurchasedProductsTable = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'purchased_products')`
    );
    const tableExists = result.rows[0].exists;

    if (!tableExists) {
      await client.query(`CREATE TABLE IF NOT EXISTS purchased_products (
        id SERIAL PRIMARY KEY,
        purchase_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      );`);
      console.log("Purchased_products table created!");
    } else {
      console.log("Purchased_products table already exists!");
    }
  } catch (error) {
    console.error("Error while creating purchased_products table", error);
  } finally {
    client.release();
  }
};

const start = async function () {
  try {
    await connectToDB();
    console.log(`Connected to database with success!`);

    await createBatchesTable();
    await createProductsTable();
    await createUserTable();
    await createPurchasesTable();
    await createPurchasedProductsTable();

    app.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

const shutdown = async function () {
  try {
    await disconnectFromDB();
    console.log(`Disconnected from database with success!`);
    process.exit(0);
  } catch (error) {
    console.error("Error while disconnecting from database", error);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  await shutdown();
});

export default app;

start();

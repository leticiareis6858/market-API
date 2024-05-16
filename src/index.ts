import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDB, disconnectFromDB } from "./db/connect";
import pool from "./db/pool";
import { batchesRoutes } from "./routes/batches";
import { productsRoutes } from "./routes/products";

const app = express();

app.use(express.json());

app.use("/api-market", batchesRoutes, productsRoutes);

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

const start = async function () {
  try {
    await connectToDB();
    console.log(`Connected to database with success!`);

    await createBatchesTable();
    await createProductsTable();

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

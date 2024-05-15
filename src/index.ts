import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDB, disconnectFromDB } from "./db/connect";
import pool from "./db/pool";

const app = express();

app.use(express.json());

dotenv.config();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Running...");
});

const port = process.env.PORT || 3000;

const createDB = async () => {
  const client = await pool.connect();

  try {
    const result = await client.query(
      "SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname = $1)",
      ["market-API"]
    );
    const exists = result.rows[0].exists;

    if (!exists) {
      await client.query('CREATE DATABASE "market-API"');
      console.log("Database created!");
    } else {
      console.log("Database already exists!");
    }
  } catch (error) {
    console.error(
      "Error while creating database or verifying if it already exists",
      error
    );
  } finally {
    await client.release();
  }
};

const start = async function () {
  try {
    await connectToDB();
    console.log(`Conected to database with success!`);

    await createDB();

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
  console.log("Shuting down...");
  await shutdown();
});

export default app;

start();

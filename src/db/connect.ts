import pool from "./pool";

export const connectToDB = async () => {
  try {
    await pool.connect();
  } catch (error) {
    console.error("Error with database connection:", error);
  }
};

export const disconnectFromDB = async () => {
  try {
    await pool.end();
    console.log("Disconnecting from database...");
  } catch (error) {
    console.error("Error while disconnecting from database:", error);
  }
};

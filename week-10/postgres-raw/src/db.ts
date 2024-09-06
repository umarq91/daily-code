import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const client = new Client({
  connectionString: process.env.DB_URL,
});

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err; // Propagate error to the caller
  }
};

import { Client } from "pg";

import * as dotenv from "dotenv";

dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function connectAndQuery() {
  try {
    await client.connect();
    console.log("Connecting to database....");

    // Query example
    const res = await client.query("SELECT NOW()");
    console.log("Current time:", res.rows[0]);
  } catch (err) {
    console.error("Error connecting to database", err);
  } finally {
    await client.end();
  }
}

connectAndQuery();

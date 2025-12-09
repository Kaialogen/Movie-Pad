import "dotenv/config";
import { SQL } from "bun";

export const pg = new SQL({
  host: "localhost",
  port: 5432,
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  database: "moviepad-db",

  max: 20,
  idleTimeout: 30,
  maxLifetime: 0,
  connectionTimeout: 30,

  onconnect: (_client) => {
    console.log("Connected to PostgreSQL");
  },
  onclose: (_client) => {
    console.log("PostgreSQL connection closed");
  },
});

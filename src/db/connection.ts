import sql from "mssql";
import "dotenv/config";

const config: sql.config = {
  server: process.env.DB_SERVER || "localhost",
  port: Number(process.env.DB_PORT || 1433),
  database: process.env.DB_NAME || "OlistInsight",

  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate:
      process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
  },

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getDb(): Promise<sql.ConnectionPool> {
  if (pool?.connected) {
    return pool;
  }

  pool = await sql.connect(config);

  return pool;
}
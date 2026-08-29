import { getDb } from "./db/connection.js";

async function main() {
  console.log("Connecting to SQL Server...");

  const db = await getDb();

  const result = await db
    .request()
    .query(`
      SELECT
        DB_NAME() AS database_name,
        @@SERVERNAME AS server_name
    `);

  console.log("Connected successfully!");
  console.table(result.recordset);
}

main().catch((error) => {
  console.error("Application failed:");
  console.error(error);

  process.exit(1);
});
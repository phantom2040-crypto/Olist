import { importOrders } from "./ingestion/orderImporter.js";

async function main() {

  console.log("Starting Olist orders import...");

  const filePath =
    "data/raw/olist_orders_dataset_small.csv";

  const startTime = Date.now();

  const stats = await importOrders(
    filePath,
    1000
  );

  const elapsedMs = Date.now() - startTime;

  console.log("");
  console.log("========== IMPORT COMPLETE ==========");
  console.log(`Rows read:              ${stats.rowsRead}`);
  console.log(`Rows valid:             ${stats.rowsValid}`);
  console.log(`Rows invalid:           ${stats.rowsInvalid}`);
  console.log(`Transformation errors:  ${stats.transformationErrors}`);
  console.log(`Rows inserted:          ${stats.rowsInserted}`);
  console.log(`Time:                   ${elapsedMs} ms`);

  if (elapsedMs > 0) {
    const rowsPerSecond =
      stats.rowsInserted / (elapsedMs / 1000);

    console.log(
      `Throughput:             ${rowsPerSecond.toFixed(2)} rows/sec`
    );
  }
}

main().catch((error) => {

  console.error("");
  console.error("IMPORT FAILED");
  console.error(error);

  process.exit(1);
});
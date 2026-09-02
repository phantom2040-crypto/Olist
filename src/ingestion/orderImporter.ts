// src/ingestion/ordersImporter.ts

import { createCsvReader } from "./csvReader.js";
import { validateOrder } from "../validation/orders.js";
import { transformOrder } from "../transformation/orders.js";
import { insertOrderBatch } from "../db/orders.js";

interface ImportStats {
  rowsRead: number;
  rowsValid: number;
  rowsInvalid: number;
  rowsInserted: number;
  transformationErrors: number;
}

export async function importOrders(
  filePath: string,
  batchSize: number = 1000
): Promise<ImportStats> {

  const stats: ImportStats = {
    rowsRead: 0,
    rowsValid: 0,
    rowsInvalid: 0,
    rowsInserted: 0,
    transformationErrors: 0,
  };

  const parser = createCsvReader(filePath);

  const batch = [];

  for await (const row of parser) {

    stats.rowsRead++;

    // 1. VALIDATION
    const validation = validateOrder(row);

    if (!validation.success) {
      stats.rowsInvalid++;

      // For now, just log it.
      // Later we'll create a proper error logger.
      console.error(
        "Invalid order:",
        validation.errors
      );

      continue;
    }

    // 2. TRANSFORMATION
    try {
      const transformed = transformOrder(validation.data);

      batch.push(transformed);
      stats.rowsValid++;

    } catch (error) {

      stats.transformationErrors++;

      console.error(
        "Transformation error:",
        error
      );

      continue;
    }

    // 3. BATCH INSERT
    if (batch.length >= batchSize) {

      await insertOrderBatch(batch);

      stats.rowsInserted += batch.length;

      batch.length = 0;
    }
  }

  // 4. INSERT REMAINING RECORDS
  if (batch.length > 0) {

    await insertOrderBatch(batch);

    stats.rowsInserted += batch.length;

    batch.length = 0;
  }

  return stats;
}
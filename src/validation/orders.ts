import { z } from "zod";
import type { ValidationResult } from "./validationResult.js";

export const orderCsvSchema = z.object({
  order_id: z.string().trim().min(1),
  customer_id: z.string().trim().min(1),
  order_status: z.string().trim().min(1),

  order_purchase_timestamp: z.string(),
  order_approved_at: z.string(),
  order_delivered_carrier_date: z.string(),
  order_delivered_customer_date: z.string(),
  order_estimated_delivery_date: z.string(),
});

export type OrderCsvRow = z.infer<typeof orderCsvSchema>;

export function validateOrder(
  row: unknown
): ValidationResult<OrderCsvRow> {
  const result = orderCsvSchema.safeParse(row);

  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }

  return {
    success: false,
    errors: result.error.issues.map((issue) => {
      const path = issue.path.join(".");

      return `${path}: ${issue.message}`;
    }),
  };
}
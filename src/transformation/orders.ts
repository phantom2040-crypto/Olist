export interface OrderRow { 
order_id: string; 
customer_id: string; 
order_status: string; 
order_purchase_timestamp: Date | null; 
order_approved_at: Date | null; 
order_delivered_carrier_date: Date | null; 
order_delivered_customer_date: Date | null; 
order_estimated_delivery_date: Date | null; 
} 
function parseDate(value: string | undefined): Date | null { 
if (!value) { 
return null; 
} 
const date = new Date(value); 
 
  return Number.isNaN(date.getTime()) 
    ? null 
    : date; 
} 
 
import type { OrderCsvRow } from "../validation/orders.js";

export function transformOrder(
  row: OrderCsvRow
): OrderRow {
  return {
    order_id: row.order_id,
    customer_id: row.customer_id,
    order_status: row.order_status,

    order_purchase_timestamp:
      parseDate(row.order_purchase_timestamp),

    order_approved_at:
      parseDate(row.order_approved_at),

    order_delivered_carrier_date:
      parseDate(row.order_delivered_carrier_date),

    order_delivered_customer_date:
      parseDate(row.order_delivered_customer_date),

    order_estimated_delivery_date:
      parseDate(row.order_estimated_delivery_date),
  };
}


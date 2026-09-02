import sql from "mssql";
import { getDb } from "./connection.js";
import type { OrderRow } from "../transformation/orders.js";

export async function insertOrderBatch(
  orders: OrderRow[]
): Promise<void> {
  if (orders.length === 0) {
    return;
  }

  const pool = await getDb();

  const table = new sql.Table("raw.orders");

  // The table already exists in SQL Server.
  table.create = false;

  table.columns.add("order_id", sql.VarChar(32), {
    nullable: false,
  });

  table.columns.add("customer_id", sql.VarChar(32), {
    nullable: true,
  });

  table.columns.add("order_status", sql.VarChar(30), {
    nullable: true,
  });

  table.columns.add(
    "order_purchase_timestamp",
    sql.DateTime2,
    {
      nullable: true,
    }
  );

  table.columns.add(
    "order_approved_at",
    sql.DateTime2,
    {
      nullable: true,
    }
  );

  table.columns.add(
    "order_delivered_carrier_date",
    sql.DateTime2,
    {
      nullable: true,
    }
  );

  table.columns.add(
    "order_delivered_customer_date",
    sql.DateTime2,
    {
      nullable: true,
    }
  );

  table.columns.add(
    "order_estimated_delivery_date",
    sql.DateTime2,
    {
      nullable: true,
    }
  );

  for (const order of orders) {
    table.rows.add(
      order.order_id,
      order.customer_id,
      order.order_status,
      order.order_purchase_timestamp,
      order.order_approved_at,
      order.order_delivered_carrier_date,
      order.order_delivered_customer_date,
      order.order_estimated_delivery_date
    );
  }

  await pool.request().bulk(table);
}
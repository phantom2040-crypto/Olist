import { describe, expect, it } from "vitest";
import { validateOrder } from "../src/validation/orders.js";

describe("validateOrder", () => {
  it("accepts a valid order", () => {
    const row = {
      order_id: "abc123",
      customer_id: "customer123",
      order_status: "delivered",

      order_purchase_timestamp: "2017-10-02 10:56:33",
      order_approved_at: "2017-10-02 11:07:15",
      order_delivered_carrier_date: "2017-10-04 14:48:00",
      order_delivered_customer_date: "2017-10-10 21:25:13",
      order_estimated_delivery_date: "2017-10-18 00:00:00",
    };

    const result = validateOrder(row);

    expect(result.success).toBe(true);
  }),
  it("rejects an order without an order_id", () => {
  const row = {
    order_id: "",
    customer_id: "customer123",
    order_status: "delivered",

    order_purchase_timestamp: "2017-10-02 10:56:33",
    order_approved_at: "",
    order_delivered_carrier_date: "",
    order_delivered_customer_date: "",
    order_estimated_delivery_date: "",
  };

  const result = validateOrder(row);

  expect(result.success).toBe(false);
});
});
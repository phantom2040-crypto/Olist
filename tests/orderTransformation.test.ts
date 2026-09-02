import { describe, expect, it } from "vitest";
import { transformOrder } from "../src/transformation/orders.js";

describe("transformOrder", () => {
  it("converts CSV values into database values", () => {
    const row = {
      order_id: "abc123",
      customer_id: "customer123",
      order_status: "delivered",

      order_purchase_timestamp: "2017-10-02 10:56:33",
      order_approved_at: "2017-10-02 11:07:15",
      order_delivered_carrier_date: "",
      order_delivered_customer_date: "",
      order_estimated_delivery_date: "2017-10-18 00:00:00",
    };

    const result = transformOrder(row);

    expect(result.order_id).toBe("abc123");
    expect(result.order_status).toBe("delivered");

    expect(
      result.order_purchase_timestamp
    ).toBeInstanceOf(Date);

    expect(
      result.order_delivered_carrier_date
    ).toBeNull();
  });
});
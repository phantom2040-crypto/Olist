import {z} from "zod";
export const orderSchema = z.object({ 
order_id: z.string().min(1), 
customer_id: z.string().min(1), 
order_status: z.string().min(1), 
order_purchase_timestamp: 
z.string().optional().or(z.literal("")), 
order_approved_at: 
z.string().optional().or(z.literal("")), 
order_delivered_carrier_date: 
z.string().optional().or(z.literal("")), 
order_delivered_customer_date: 
z.string().optional().or(z.literal("")), 
order_estimated_delivery_date: 
z.string().optional().or(z.literal("")), 
}); 

/*
The orderSchema is a Zod schema that defines the structure and validation rules for an order object. 
It ensures that the order_id, customer_id, and order_status fields are non-empty strings, while the timestamp fields are optional strings or empty strings. 
This schema can be used to validate incoming data before processing it further in the application.
We're not converting the dates here yet. 
*/
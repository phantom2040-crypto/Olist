export interface DatasetConfig { 
name: string; 
fileName: string; 
tableName: string; 
batchSize: number; 
} 
export const datasets: Record<string, DatasetConfig> = { 
  orders: { 
    name: "orders", 
    fileName: "olist_orders_dataset.csv", 
    tableName: "raw.orders", 
    batchSize: 1000, 
  }, 
 
  customers: { 
    name: "customers", 
    fileName: "olist_customers_dataset.csv", 
    tableName: "raw.customers", 
    batchSize: 1000, 
  }, 
 
  products: { 
    name: "products", 
    fileName: "olist_products_dataset.csv", 
    tableName: "raw.products", 
    batchSize: 1000, 
  }, 
 
  sellers: { 
    name: "sellers", 
    fileName: "olist_sellers_dataset.csv", 
    tableName: "raw.sellers", 
    batchSize: 1000, 
  }, 
};
//We'll add the remaining datasets after the first importer works. 

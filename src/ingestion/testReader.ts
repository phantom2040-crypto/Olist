
import { createCsvReader } from "./csvReader.js"; 
async function main() { 
const filePath = 
"data/raw/olist_orders_dataset.csv"; 
const parser = createCsvReader(filePath); 
let count = 0; 
for await (const row of parser) { 
count++; 
if (count <= 5) { 
console.log(row); 
} 
} 
console.log(`Total rows: ${count}`); 
} 
main().catch(console.error); 

/*
for await (const row of parser) 
is one of the important Node.js concepts in this project. 
We're consuming an async iterable. 
Conceptually: 
CSV 
│ 
├── row 1 → await 
├── row 2 → await 
├── row 3 → await 
├── ... 
└── row 99,441 
Node isn't required to hold all 99,441 records in memory. 
That's the first major performance lesson here. 
 */
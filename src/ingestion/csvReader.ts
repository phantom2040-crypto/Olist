import fs from 'node:fs';
import { parse } from 'csv-parse';

export function createCsvReader(filePath: string) {
  const fileStream = fs.createReadStream(filePath,{
    encoding: 'utf-8',
  });
  const parser = parse({ columns: true, skip_empty_lines: true,
    bom:true, 
    trim: true,
   });
   return fileStream.pipe(parser);
}
/* This is an important Node.js concept. 
We're not doing: 
const file = fs.readFileSync(filePath); 
because that loads the entire file into memory. 
Instead: 
Disk -> ReadStream ->CSV parser -> one row at a time  
*/
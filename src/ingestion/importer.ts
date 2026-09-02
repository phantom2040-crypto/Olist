export interface ImportStats { 
rowsRead: number; 
rowsValid: number; 
rowsInvalid: number; 
rowsInserted: number; 
batchesInserted: number; 
startedAt: Date; 
finishedAt?: Date; 
}
export function addToBatch<T>(batch: T[], item: T, batchSize: number) {
  batch.push(item);
  return batch.length >= batchSize;
}
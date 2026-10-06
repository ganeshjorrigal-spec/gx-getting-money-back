const CASES_PER_BATCH = 5;

export function responseSheetSyncDelay(index: number): number {
  return Math.floor(index / CASES_PER_BATCH) * 1000;
}

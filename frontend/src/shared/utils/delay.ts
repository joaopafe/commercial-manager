/**
 * Receives a time in milliseconds and creates a time promise
 * @param ms
 * @returns void
 */
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

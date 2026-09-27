/**
 * Enveloppe une promesse avec un timeout — rejette si elle ne résout pas à temps.
 * Évite que les appels réseau (auth, fetch) restent bloqués indéfiniment.
 */
export function withTimeout<T>(
  promise: Promise<T>,
  ms = 10_000,
  message = "Request timed out",
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(message)), ms);
    }),
  ]);
}

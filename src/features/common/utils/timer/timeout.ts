/**
 * promisify setTimeout
 */
export function timeout(ms = 0) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

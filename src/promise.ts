/**
 * Sleep for a given amount of time
 * @param ms
 * @returns
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

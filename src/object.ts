import { remove } from './array'
import { notNullish } from './guards'

/**
 * map 一个对象
 * @param object
 * @param fn
 * @returns
 */
export function mapObject<K extends string | number | symbol, V, NK = K, NV = V>(
  object: Record<K, V>,
  fn: (key: K, value: V) => [NK, NV] | undefined,
): Record<K, V> {
  return Object.fromEntries(
    Object.entries(object).map(([k, v]) => fn(k as K, v as V)).filter(notNullish),
  )
}

/**
 * 判断指定的key是否在对象中存在
 * Marks `k` as a key of `T` if `k` is in `obj`.
 *
 * @category Object
 * @param obj object to query for key `k`
 * @param k key to check existence in `obj`
 */
export function isKeyOf<T extends object>(obj: T, k: keyof any): k is keyof T {
  return k in obj
}

/**
 * Object.keys 的类型安全版本
 *
 * @category Object
 */
export function objectKeys<T extends object>(obj: T) {
  return Object.keys(obj) as Array<`${keyof T & (string | number | boolean | null | undefined)}`>
}

/**
 * Object.entries 的类型安全版本
 *
 * @category Object
 */
export function objectEntries<T extends object>(obj: T) {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>
}

/**
 * Create a new subset object by giving keys
 *
 * @category Object
 */
export function objectPick<O extends object, T extends keyof O>(obj: O, keys: T[], omitUndefined = false) {
  return keys.reduce((n, k) => {
    if (k in obj) {
      if (!omitUndefined || obj[k] !== undefined)
        n[k] = obj[k]
    }
    return n
  }, {} as Pick<O, T>)
}

/**
 * Create a promise lock
 *
 * @category Promise
 * @example
 * ```
 * const lock = createPromiseLock()
 *
 * lock.run(async () => {
 *   await doSomething()
 * })
 *
 * // in anther context:
 * await lock.wait() // it will wait all tasking finished
 * ```
 */
export function createPromiseLock() {
  const locks: Promise<any>[] = []

  return {
    async run<T = void>(fn: () => Promise<T>): Promise<T> {
      const p = fn()
      locks.push(p)
      try {
        return await p
      }
      finally {
        remove(locks, p)
      }
    },
    async wait(): Promise<void> {
      await Promise.allSettled(locks)
    },
    isWaiting() {
      return Boolean(locks.length)
    },
    clear() {
      locks.length = 0
    },
  }
}

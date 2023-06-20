/**
 * 限制数字在最小值和最大值之间
 * @param n
 * @param min
 * @param max
 * @returns
 */
export function clamp(n: number, min: number, max: number) {
  const _min = Math.min(min, max)
  const _max = Math.max(min, max)
  return Math.min(Math.max(n, _min), _max)
}

/**
 * 求和
 * @param args
 * @returns
 */
export function sum(...args: number[]) {
  return args.reduce((total, current) => total + current, 0)
}

/**
 * 基于 `t` 在 `min` 和 `max` 之间进行插值
 *
 * @category Math
 * @param t The interpolation value clamped between 0 and 1
 * @example
 * ```
 * const value = lerp(0, 2, 0.5) // value will be 1
 * ```
 */
export function lerp(min: number, max: number, t: number) {
  const interpolation = clamp(t, 0.0, 1.0)
  return min + (max - min) * interpolation
}

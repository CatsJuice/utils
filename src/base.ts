/**
 * 断言指定的条件是否为真
 * @param condition
 * @param msg
 */
export function assert(condition: boolean, msg: string): asserts condition {
  if (!condition) throw new Error(msg)
}

/**
 * 将指定的值转换为字符串
 * @param v
 * @returns
 */
export function toString(v: any) {
  return Object.prototype.toString.call(v)
}

/**
 * 获取指定值的类型名称
 * @param v
 * @returns
 */
export function getTypeName(v: unknown) {
  if (v === null) return 'null'
  const type = toString(v).slice(8, -1).toLowerCase()
  return (typeof v === 'object' || typeof v === 'function') ? type : typeof v
}

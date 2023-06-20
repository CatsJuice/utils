import { getTypeName } from './base'

/**
 * 比较两个值是否相等，如果是对象/数组，则递归比较
 * @param value1
 * @param value2
 */
export function isDeepEqual(value1: any, value2: any): boolean {
  const type1 = getTypeName(value1)
  const type2 = getTypeName(value2)

  if (type1 !== type2) return false

  if (type1 === 'array') {
    if (value1.length !== value2.length) return false

    return value1.every((item: any, index: number) => isDeepEqual(item, value2[index]))
  }

  if (type1 === 'object') {
    const keys1 = Object.keys(value1)
    const keys2 = Object.keys(value2)

    if (keys1.length !== keys2.length) return false

    return keys1.every(key => isDeepEqual(value1[key], value2[key]))
  }

  return Object.is(value1, value2)
}

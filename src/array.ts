export type PartitionFilter<T> = (item: T, index: number, arr: readonly T[]) => any

/**
 * 将数组按照指定的条件分割成多个数组
 * @param arr
 * @param filters
 * @returns
 */
export function partition<T>(arr: readonly T[], ...filters: PartitionFilter<T>[]): T[][] {
  const result: T[][] = new Array(filters.length + 1).fill(0).map(() => [])

  arr.forEach((item, index) => {
    let i = 0
    for (const filter of filters) {
      const flag = filter(item, index, arr)
      if (flag) return result[i].push(item)
      i++
    }
    result[i].push(item)
  })

  return result
}

/**
 * 数组去重
 * @param array
 * @returns
 */
export function uniq<T>(array: readonly T[]): T[] {
  return Array.from(new Set(array))
}

/**
 * 获取指定下标的元素，下标可以为负数
 *
 * @category Array
 */
export function at(array: readonly [], index: number): undefined
export function at<T>(array: readonly T[], index: number): T
export function at<T>(array: readonly T[] | [], index: number): T | undefined {
  const len = array.length
  if (!len) return undefined
  if (index < 0) index += len
  // may still be negative, ignored
  return array[index]
}

/**
 * 生成数字范围数组
 *
 * @category Array
 */
export function range(stop: number): number[]
export function range(start: number, stop: number, step?: number): number[]
export function range(...args: any): number[] {
  let start: number, stop: number, step: number

  if (args.length === 1) {
    start = 0
    step = 1;
    ([stop] = args)
  }
  else {
    ([start, stop, step = 1] = args)
  }

  const arr: number[] = []
  let current = start
  while (current < stop) {
    arr.push(current)
    current += step || 1
  }

  return arr
}

/**
 * 移动数组中的指定元素到指定位置
 * @param arr
 * @param from
 * @param to
 * @returns
 */
export function move<T>(arr: T[], from: number, to: number) {
  arr.splice(to, 0, arr.splice(from, 1)[0])
  return arr
}

/**
 * 随机打乱数组
 * @category Array
 */
export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

/**
 * 从数组中移除指定的元素（只移除第一个）
 * @category Array
 */
export function remove<T>(array: T[], value: T) {
  if (!array)
    return false
  const index = array.indexOf(value)
  if (index >= 0) {
    array.splice(index, 1)
    return true
  }
  return false
}

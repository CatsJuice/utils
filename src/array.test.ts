import { expect, it } from 'vitest'
import { at, partition, range, uniq } from './array'

const arr1 = [1, 2, 3, 4, 5]
const arr2 = [1, 2, 2, 3, 3, 4]
const arr3 = [1, '1', '2', 2]

it('partition', () => {
  const isOdd = (i: number) => i % 2 === 1
  const isEven = (i: number) => i % 2 === 0
  const lt3 = (i: number) => i < 3
  const gt3 = (i: number) => i > 3
  const is3 = (i: number) => i === 3

  expect(partition(arr1, isOdd, isEven)).toEqual([[1, 3, 5], [2, 4], []])
  expect(partition(arr1, isOdd)).toEqual([[1, 3, 5], [2, 4]])
  expect(partition(arr1, isEven)).toEqual([[2, 4], [1, 3, 5]])
  expect(partition(arr1, lt3, gt3)).toEqual([[1, 2], [4, 5], [3]])
  expect(partition(arr1, is3)).toEqual([[3], [1, 2, 4, 5]])
})

it('uniq', () => {
  expect(uniq(arr1)).toEqual([1, 2, 3, 4, 5])
  expect(uniq(arr2)).toEqual([1, 2, 3, 4])
  expect(uniq(arr3)).toEqual([1, '1', '2', 2])
})

it('at', () => {
  expect(at(arr1, 0)).toEqual(1)
  expect(at(arr1, 1)).toEqual(2)
  expect(at(arr1, -1)).toEqual(5)
})

it('range', () => {
  expect(range(5)).toEqual([0, 1, 2, 3, 4])
  expect(range(1, 5, 2)).toEqual([1, 3])
  expect(range(5, 1, -2)).toMatchInlineSnapshot('[]')
  expect(range(5, 1, 2)).toMatchInlineSnapshot('[]')
})

import { expect, it } from 'vitest'
import { isDeepEqual } from './equal'

it('isDeepEqual', () => {
  expect(isDeepEqual(
    { a: 1 },
    { a: 1 },
  )).toEqual(true)

  expect(isDeepEqual(
    [1, 2, 3, { a: 1 }, null, undefined, false, ''],
    [1, 2, 3, { a: 1 }, null, undefined, false, ''],
  )).toEqual(true)

  expect(isDeepEqual(
    { a: 1, b: 2 },
    { b: 2, a: 1 },
  )).toEqual(true)

  expect(isDeepEqual(
    { a: 1, b: 2 },
    { a: 1, b: 2, c: 3 },
  )).toEqual(false)

  expect(isDeepEqual([], {})).toEqual(false)
  expect(isDeepEqual(1, '1')).toEqual(false)
  expect(isDeepEqual(1, 1)).toEqual(true)
  expect(isDeepEqual(1, 2)).toEqual(false)
})

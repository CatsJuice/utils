import { expect, it } from 'vitest'
import { isBoolean, isDate, isDef } from './is'

it('isDef', () => {
  expect(isDef(undefined)).toEqual(false)
  expect(isDef(null)).toEqual(true)
  expect(isDef(0)).toEqual(true)
  expect(isDef('')).toEqual(true)
  expect(isDef(false)).toEqual(true)
})

it('isBoolean', () => {
  expect(isBoolean(false)).toEqual(true)
  expect(isBoolean(true)).toEqual(true)
})

it('isDate', () => {
  expect(isDate(new Date())).toEqual(true)
  expect(isDate(Date.now())).toEqual(false)
})

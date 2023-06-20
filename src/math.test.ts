import { expect, it } from 'vitest'
import { clamp, lerp } from './math'

it('clamp', () => {
  expect(clamp(1, 2, 3)).toEqual(2)
  expect(clamp(2, 2, 3)).toEqual(2)
  expect(clamp(3, 2, 3)).toEqual(3)
  expect(clamp(4, 2, 3)).toEqual(3)
  expect(clamp(5, 3, 2)).toEqual(3)
  expect(clamp(1, 3, 2)).toEqual(2)
})

it('lerp', () => {
  expect(lerp(0, 2, 0.5)).toEqual(1)
  // expect(lerp(0.2, 0.4, 0.5)).toEqual(0.3)
})

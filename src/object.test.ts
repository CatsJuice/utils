import { expect, it } from 'vitest'
import { objectOmit } from './object'

it('objectOmit', () => {
  expect(objectOmit({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toEqual({ c: 3 })
})

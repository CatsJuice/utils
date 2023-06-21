import { expect, it } from 'vitest'
import { validatePath } from './url'

it('validatePath', () => {
  expect(validatePath('//api/basic/test')).toBe('/api/basic/test')
  expect(validatePath('//api/basic/test/')).toBe('/api/basic/test/')
  expect(validatePath('////api/basic/test')).toBe('/api/basic/test')
  expect(validatePath('api/basic/test')).toBe('/api/basic/test')
  expect(validatePath('api/basic/test/')).toBe('/api/basic/test/')
  expect(validatePath('api/basic/test//')).toBe('/api/basic/test/')
  expect(validatePath('api/basic/test///')).toBe('/api/basic/test/')
  expect(validatePath('file:///api/basic/test')).toBe('file://api/basic/test')
  expect(validatePath('https://www.example.com///test'))
    .toBe('https://www.example.com/test')
  expect(validatePath('https:///www.example.com///test'))
    .toBe('https://www.example.com/test')
})

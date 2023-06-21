import type { Arrayable } from '../type'

export function getArrayableFirst<T>(value: Arrayable<T>) {
  return Array.isArray(value) ? value[0] : value
}

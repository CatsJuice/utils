import { describe, expect, it } from 'vitest'
import { p as P } from './p'
import { sleep } from './promise'

describe('should', () => {
  it('p', async () => {
    const p = P()
    let dummy = 0
    p.add((async () => {
      await sleep(100)
      dummy += 1
      return 4
    })())
    expect(dummy).toBe(0)
    await p
    expect(dummy).toBe(1)
  })

  it('chain array map', async () => {
    expect(
      await P([1, 2, 3, 4, 5])
        .map(async (i) => {
          await sleep(100)
          return i * i
        })
        .filter(i => i > 10)
        .reduce((a, b) => a + b, 0),
    )
      .toBe(41)
  })

  it('concurrency: 1', async () => {
    let running = 0

    const promises = Array.from({ length: 100 }, async (_, i) => {
      running++
      expect(running).toBeLessThanOrEqual(1)
      running--
      return i
    })

    const results = await P(promises, { concurrency: 1 }).reduce((a, b) => a + b, 0)
    expect(results).toBe(4950)
  })

  it('concurrency: 4', async () => {
    let running = 0
    const length = 20
    const concurrency = 1

    const promises = Array.from({ length }).map((_, i) => (async () => {
      running++
      await sleep(Math.random() * 1000)
      running--
      return i
    })())

    const res = await P(promises, { concurrency })
    expect(res).toHaveLength(length)
  })
})

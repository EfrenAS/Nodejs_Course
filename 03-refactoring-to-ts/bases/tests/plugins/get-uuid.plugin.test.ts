import { getUUID } from '../../src/plugins'

describe('plugins/get-uuid.plugin.ts', () => {
  test('getUUID() should return a uuid of 36 characters', () => {
    const uuid = getUUID()

    expect (typeof uuid).toBe('string')
    expect (uuid.length).toBe(36)
  })
})
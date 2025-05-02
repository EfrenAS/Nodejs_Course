import { getAge } from '../../src/plugins'

describe('plugins/get-age.plugin.ts', () => {
  test('getAge() should return the age of a person', () => {
    const birthday = '1990-01-01'
    const age = getAge({ birthday })
    
    expect(typeof age).toBe('number')
  })
})
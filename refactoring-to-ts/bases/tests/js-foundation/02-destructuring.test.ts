import { characters } from '../../src/js-foundation/02-destructuring'

describe('destructuring module', () => {
  
  test('characters should contain Flash, Superman', ()=> {
    expect(characters).toContain('Flash')
    expect(characters).toContain('Superman')
  })

  test ('First element should be Flash and second elememt should be Superman', ()=> {
    const [flash, superman] = characters

    expect(flash).toBe('Flash')
    expect(superman).toBe('Superman')
  })
});
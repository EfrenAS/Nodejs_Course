import { buildMakePerson } from '../../src/js-foundation/05-factory-functions'

describe('js-foundation/05-factory-functions', () => {
  
  const getUUID = () => '123'
  const getAge = () => '25'
  
  test('buildMakePerson should return a function', () => {
      
    const makePerson = buildMakePerson({ getUUID, getAge })
    expect(typeof makePerson).toBe('function')
  })

  test('buildMakePerson should return a person', () => {

    const makePerson = buildMakePerson({ getUUID, getAge })
    const john = makePerson({ name: 'John', birthday: '1990-01-01' })

    expect(john).toEqual({
      id: '123',
      name: 'John',
      birthday: '1990-01-01',
      age: '25'
    })
  })

})
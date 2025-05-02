import { getUserById } from '../../src/js-foundation/03-callbacks'

describe('js-foundation/03-callbacks', () => {
  test('getUserById should return an error if user does not exist', () => {
    const id = 10
    getUserById(id, (error, user) => {
      expect(error).toBe(`User not found with id: ${id}`)
      expect(user).toBeUndefined()
    })
  })

  test('getUserById should return Jane', (done) => {
    const id = 1
    getUserById(id, (error, user) => {
      expect(user).toEqual({ id: 1, name: 'Jane', age: 25 })
      expect(error).toBeUndefined()
      done()
    })
  })
})

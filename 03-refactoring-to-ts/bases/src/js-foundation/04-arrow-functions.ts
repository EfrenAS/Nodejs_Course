interface User {
  id: number
  name: string
  age: number
}

const users = [
  {
    id: 1,
    name: 'Jane',
    age: 25
  },
  {
    id: 2,
    name: 'John',
    age: 30
  },
  {
    id: 3,
    name: 'Jack',
    age: 35
  }
]

export const getUserById = (
  id: string | number,
  callback: (error?: string, user?: User) => void
) => {
  const user = users.find((user) => user.id === id)

  return (user != null)
    ? callback(undefined, user)
    : callback(`User not found with id: ${id}`)
}

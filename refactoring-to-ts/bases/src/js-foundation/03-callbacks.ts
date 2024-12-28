interface User {
  id: number
  name: string
  age: number
}

const users: User[] = [
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

export function getUserById (
  id: number,
  callback: (error?: string, user?: User) => void
) {
  const user = users.find(function (user) {
    return user.id === id
  })

  if (user == null) {
    return callback(`User not found with id: ${id}`)
  }

  return callback(undefined, user)
}

const users = [
  { 
    id: 1,
    name: 'Jane',
    age: 25 },
  {
    id: 2,
    name: 'John',
    age: 30
  },
  {
    id: 3,
    name: 'Jack',
    age: 35
  },
]

const getUserById = (id, callback) => {
  const user = users.find( user => user.id === id)

  return (user) 
    ? callback(null, user) 
    : callback(`User not found with id: ${id}`)
}

module.exports = {
  getUserById,
}
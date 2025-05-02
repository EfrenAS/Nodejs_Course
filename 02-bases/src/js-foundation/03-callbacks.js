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

function getUserById (id, callback) {
  const user = users.find( function(user) {
    return user.id === id
  })

  if (!user) {
    return callback(`User not found with id: ${id}`)
  }

  return callback(null, user)
}

module.exports = {
  getUserById,
}
// Una factoru funcion es una funcion que devuelve otra funcion

const buildMakePerson = ({getUUID, getAge}) => {
  return ({name, birthday}) => {
    return {
      id: getUUID(),
      name,
      birthday,
      age: getAge({birthday}),
    }
  }
}

module.exports = {
  buildMakePerson,
}

//const { getUserById } = require('./src/js-foundation/03-callbacks')

// const { getUserById } = require('./src/js-foundation/04-arrow-functions')
// const id = 2

// getUserById (id , function(error, user) {
//   if (error) {
//     throw new Error(error)
//   }

//   console.log(user)
// })


/****** Arrow functions ******/

// getUserById(id, (error, user) => {
  
//   if (error) throw new Error(error)
  
//     console.log(user)
// })


/******** Factory functions *****/


// const { getAge, getUUID } = require('./src/plugins')
// const { buildMakePerson }  = require ('./src/js-foundation/05-factory-functions')

// const buildPerson = buildMakePerson({ getUUID, getAge })

// const obj = {
//   name: 'John',
//   birthday: '1985-06-28',
// }

// const john = buildPerson(obj)

// console.log(john)



/******* Promises  **********/

// const getPokemonById = require('./src/js-foundation/06-promises')
// getPokemonById(2)
//   .then(pokemonName => console.log(pokemonName))
//   .catch(error => console.log('Por favor intente de nuevo'))
  
/**
 * Logger Plugin
*/

const { buildLogger } = require('./src/plugins')

const logger = buildLogger('app.js')

logger.log('Hello World')
logger.error('Error Message Test')
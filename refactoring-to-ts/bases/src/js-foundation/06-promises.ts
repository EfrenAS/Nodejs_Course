/** ***** Promises  **********/
// const getPokemonById = (id, callback) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${id}`

//   return fetch(url)
//     .then(response =>  response.json())
//     .then(pokemon => pokemon.name)
// }

/**
 * Async/Await
 */

// const getPokemonById = async (id) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${id}`
//   const response = await fetch(url)
//   const pokemon = await response.json()
//   return pokemon.name
// }

/**
 * Adapter Pattern
 */

import { httpClientPlugin } from '../plugins'

export const getPokemonById = async (id: string | number): Promise<string> => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemon = await httpClientPlugin.get(url)

    return pokemon.name
  } catch (error) {
    throw new Error(`Pokemon not found with id: ${id}`)
  }
}

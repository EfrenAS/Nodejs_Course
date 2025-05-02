import { getPokemonById } from '../../src/js-foundation/06-promises'

describe('js-foundation/06-promises.ts', ()=> {
  
  test('gestPokemonById should return a pokemon name', async () => {
    const pokemonId = 1
    const pokemonName = await getPokemonById(pokemonId)

    expect(pokemonName).toBe('bulbasaur')
  })

  // test('Should return an error if pokemon does not exist', async () => {
  //   const pokemonId = 1
  //   try {
  //     await getPokemonById(pokemonId)
  //     expect(true).toBeFalsy()
      
  //   } catch (error) {
  //     expect(error).toBe(`Error: Pokemon not found with id: ${pokemonId}`)
  //   }
  // })fa
})
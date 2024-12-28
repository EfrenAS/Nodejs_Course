import { heores } from '../data/heroes'

export const finHeroById = (id: number) => heores.find((hero) => hero.id === id)

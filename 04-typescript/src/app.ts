import { finHeroById } from './services/hero.service'

const hero = finHeroById(1)

console.log(hero?.name ?? 'Hero not found')
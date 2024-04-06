import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

const GRASS_STARTERS = ['chikorita', 'treecko', 'sprigatito', 'rowlet', 'turtwig', 'snivy', 'grookey', 'chespin', 'bulbasaur']
const FIRE_STARTERS = ['tepig', 'fennekin', 'chimchar', 'fuecoco', 'charmander', 'cyndaquil', 'litten', 'scorbunny', 'torchic']
const WATER_STARTERS = ['sobble', 'quaxly', 'oshawatt', 'popplio', 'mudkip', 'squirtle', 'froakie', 'piplup', 'totadile']

export const chooseStarter = async (type) => {
  let typeArray;
  if (type === 'grass') {
    typeArray = GRASS_STARTERS;
  } else if (type === 'water') {
    typeArray = WATER_STARTERS;
  } else if (type === 'fire') {
    typeArray = FIRE_STARTERS;
  } else {
    console.log('no type was selected.')
   return new Error('no type was selected.')
  }

  const choose = Math.floor(Math.random()*10)
  const attack = Math.floor(Math.random()*5 + 3)
  const defense = Math.floor(Math.random()*5 + 3)
  const health = Math.floor(Math.random()*5 + 14)

  try {
    const pokemon = await P.getPokemonByName(typeArray[choose])
    const pokemonData = {
      name: pokemon.name,
      number: pokemon.id,
      image: pokemon.sprites.front_default,
      createdAt: new Date().toISOString(),
      stats: {
        ATK: attack,
        DEF: defense,
        HP: health
      }
      
    }
    return pokemonData;
  } catch (err) {
    console.log(`there was an error: ${err}.`)
  }
}

import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();

const GRASS_STARTERS = ['chikorita', 'treecko', 'sprigatito', 'rowlet', 'turtwig', 'snivy', 'grookey', 'chespin', 'bulbasaur']


export const grass = async () => {
  const choose = Math.floor(Math.random()*10)
  console.log(choose)
  try {
    const pokemon = await P.getPokemonByName(GRASS_STARTERS[choose])
    console.log(pokemon.name);
    return pokemon.name;
  } catch (err) {
    console.log(`there was an error: ${err}.`)
  }
}

import { firestore } from "../util/admin.js";
import { chooseStarter } from "../../PokeApi/starters.js";

export const addPokedex = async (req, res) => {

  const pokemon = await chooseStarter(req.body.type);
  const userDoc = firestore.collection('pokedexes').doc(`pokedex-${req.user.uid}`);
  const checkDoc = await userDoc.get();


  try {
    if (checkDoc.exists) {
     throw new Error('A Pokedex already exist for this user')
    }

    const newPokedexEntry = {
      pokedexId: `pokedex-${req.user.uid}`,
      userId: req.user.uid,
      createdAt: new Date().toISOString()
    }

    firestore.collection('pokedexes')
      .doc(`pokedex-${req.user.uid}`)
      .set(newPokedexEntry)

    firestore.collection('pokedexes')
      .doc(`pokedex-${req.user.uid}`)
      .collection('pokemon')
      .doc(`${pokemon.name}`)
      .set(pokemon)

    return res.json({message: `document ${newPokedexEntry.pokedexId} created succesfully.`})
  } catch (err) {
    console.error(err)
    return res.status(500).json({error: err})
  }  
}

export const getFirstPokemon = async (req, res) => {

let firstPokemon = {};
const newPokedex = firestore.collection("pokedexes").doc(`pokedex-${req.user.uid}`).collection('pokemon');
console.log(newPokedex);
const firstPokemonSnapshot = await newPokedex.orderBy('createdAt', "desc").limit(1).get();
console.log(firstPokemonSnapshot.docs[0]);
try {
  if (!firstPokemonSnapshot.empty) {
    console.log(firstPokemonSnapshot.docs[0])
    firstPokemon = firstPokemonSnapshot.docs[0].data();
  }
  return res.json(firstPokemon)
} catch (err) {
  console.error(err)
  return res.status(500).json({error: err})
}
}
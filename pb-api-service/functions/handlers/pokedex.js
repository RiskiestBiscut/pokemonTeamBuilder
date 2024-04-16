import { FieldValue } from '@google-cloud/firestore'
import { firestore } from "../util/admin.js";
import { chooseStarter, addNewFirstGenPokemon } from "../../PokeApi/pokemonfunctions.js";


// add a new pokedex and battle party collection and tie to current user.
export const addPokedex = async (req, res) => {

  const pokemon = await chooseStarter(req.body.type);

  const pokedexDoc = firestore.collection('pokedexes').doc(`pokedex-${req.user.uid}`);
  const battlePartyDoc = firestore.collection('battleParties').doc(`battleParty-${req.user.uid}`);
  const checkPokedexDoc = await pokedexDoc.get();
  const checkBattlePartyDoc = await battlePartyDoc.get();


  try {
    if (checkPokedexDoc.exists) {
     throw new Error('A Pokedex already exist for this user')
    }

    if (checkBattlePartyDoc.exists) {
      throw new Error('A Battle Party already exist for this user')
     }


    const newPokedexEntry = {
      pokedexId: `pokedex-${req.user.uid}`,
      userId: req.user.uid,
      createdAt: new Date().toISOString()
    }

    const newBattlePartyEntry = {
      battlePartyId: `battleParty-${req.user.uid}`,
      userId: req.user.uid,
      createdAt: new Date().toISOString(),
      currentParty: [pokemon]
    }

    firestore.collection('pokedexes')
      .doc(`pokedex-${req.user.uid}`)
      .set(newPokedexEntry)

    firestore.collection('pokedexes')
      .doc(`pokedex-${req.user.uid}`)
      .collection('pokemon')
      .doc(`${pokemon.name}`)
      .set(pokemon)

      firestore.collection('battleParties')
        .doc(`battleParty-${req.user.uid}`)
        .set(newBattlePartyEntry)

    return res.json({message: `document ${newPokedexEntry.pokedexId} and ${newBattlePartyEntry.battlePartyId} created succesfully.`})
  } catch (err) {
    console.error(err)
    return res.status(500).json({error: err})
  }  
}


// get all the info of the users current battle party
export const getBattleParty = async (req, res) => {
let battlePartyPokemon = {};
const battleParty = firestore.collection("battleParties").doc(`battleParty-${req.user.uid}`)
console.log(battleParty);
const battlePartySnapshot = await battleParty.get();

try {
  if (battlePartySnapshot.exists) {
    battlePartyPokemon = battlePartySnapshot.data();
  }
  return res.status(200).json(battlePartyPokemon)
} catch (err) {
  console.error(err)
  return res.status(500).json({error: err})
}
}


// add a new pokemon to a users pokedex
export const addNewPokemon = async (req, res) => {
  const pokemon = await addNewFirstGenPokemon();
  console.log(pokemon);
  const pokemonDoc = firestore.collection('pokedexes').doc(`pokedex-${req.user.uid}`).collection('pokemon').doc(`${pokemon.name}`);
  const battlePartyDoc = firestore.collection('battleParties').doc(`battleParty-${req.user.uid}`)
  const checkPokemonDoc = await pokemonDoc.get();
  const checkBattlePartyDoc = await battlePartyDoc.get();

  try {
    if (checkPokemonDoc.exists) {
      throw new Error('This user already has this pokemon.')
    }
    pokemonDoc.set(pokemon);
    if (checkBattlePartyDoc.data().currentParty.length < 6) {
      const userBattleParty = firestore.collection('battleParties').doc(`battleParty-${req.user.uid}`);
      await userBattleParty.update({
        currentParty: FieldValue.arrayUnion(pokemon)
      });
    }
    console.log(pokemon);
    return res.json({message: `document ${pokemon.name} created succesfully.`})
  } catch (err) {
    console.error(err)
    return res.status(500).json({error: err})
  }
}


 // get all pokemon in a users pokedex
export const getAllPokedex = async (req, res) => {

  try {

    const pokedexRef = firestore.collection('pokedexes').doc(`pokedex-${req.user.uid}`).collection('pokemon');
    const snapshot = await pokedexRef.get();
    snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
    });
    const value = snapshot.docs.map(doc => doc.data());
    return res.status(200).json({value})
  } catch (err) {
    return res.status(500).json({error: err})
  }
    
}

export const updateBattleParty = async (req, res) => {
  const newPokemonDoc = firestore.collection('pokedexes').doc(`pokedex-${req.user.uid}`).collection('pokemon').doc(`${req.body.newName}`)
  const oldPokemonDoc = firestore.collection('pokedexes').doc(`pokedex-${req.user.uid}`).collection('pokemon').doc(`${req.body.oldName}`)

  const newPokemonSnapshot = await newPokemonDoc.get();
  const oldPokemonSnapshot = await oldPokemonDoc.get();

  const newPokemon = await newPokemonSnapshot.data();
  const oldPokemon = await oldPokemonSnapshot.data();

  try {
      const userBattleParty = firestore.collection('battleParties').doc(`battleParty-${req.user.uid}`);
      await userBattleParty.update({
        currentParty: FieldValue.arrayRemove(oldPokemon)
      });
      await userBattleParty.update({
        currentParty: FieldValue.arrayUnion(newPokemon)
      });
    return res.status(200).json("good")
  } catch (err) {
    console.log(err)
  }

}

export const getSinglePokemonByName = async (req, res) => {

  console.log(req.query.name);

  try {
    return res.status(200).json('working')
  } catch (err) {
    console.log(err)
  }
}
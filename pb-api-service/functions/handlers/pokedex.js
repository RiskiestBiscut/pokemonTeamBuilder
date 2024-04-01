import { firestore } from "../util/admin.js";
import { grass } from "../../PokeApi/starters.js";

export const addPokedex = async (req, res) => {
  const pokemon = await grass();

  const newPokedexEntry = {
    pokedexId: `pokedex-${req.user.uid}`,
    pokemonName: [pokemon],
    userId: req.user.uid,
    createdAt: new Date().toISOString()
  }

  firestore.collection('pokedexs')
    .add(newPokedexEntry)
    .then(doc => {
      res.json({message: `document ${doc.id} created succesfully.`})
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({error: "something went wrong."})
    })
}
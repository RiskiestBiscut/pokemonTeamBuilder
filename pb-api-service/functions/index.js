import express from 'express'
import cors from 'cors';

const app = express();

import { FBAuth } from './util/fbAuth.js';
import { signup, login, getAuthenticatedUser, updateNewUserDetails } from './handlers/users.js';
import { addPokedex, addNewPokemon, getAllPokedex, getBattleParty, updateBattleParty, getSinglePokemonByName } from './handlers/pokedex.js';
import * as functions from "firebase-functions";


const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

// Pokemon
app.post('/addPokedex', FBAuth, addPokedex);
app.get('/getBattleParty', FBAuth, getBattleParty);
app.post('/addNewPokemon', FBAuth, addNewPokemon);
app.get('/getAllPokedex', FBAuth, getAllPokedex);
app.post('/updateBattleParty', FBAuth, updateBattleParty)
app.get('/getSinglePokemonByName', FBAuth, getSinglePokemonByName)

// Items/store


//users
app.get('/user', FBAuth, getAuthenticatedUser)
app.put('/user', FBAuth, updateNewUserDetails)

// Auth routes
app.post('/signup', signup)
app.post('/login', login)


export const api = functions.https.onRequest(app);
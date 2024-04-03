import express from 'express'
import cors from 'cors';

const app = express();

import { FBAuth } from './util/fbAuth.js';
import { signup, login } from './handlers/users.js';
import { addPokedex } from './handlers/pokedex.js';
import * as functions from "firebase-functions";

const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,
  optionSuccessStatus:200
}

app.use(cors(corsOptions));

// Pokemon
app.post('/addPokedex', FBAuth, addPokedex);

// Items/store

// Auth routes
app.post('/signup', signup)
app.post('/login', login)


export const api = functions.https.onRequest(app);
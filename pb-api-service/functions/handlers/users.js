import {firestore, admin} from "../util/admin.js";

import { firebaseConfig } from "../util/config.js";

import {initializeApp} from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { validateSignupData, validateLoginData } from "../util/validators.js";


const firebase = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebase);

export const signup = (req, res) => {
  const userObj = req.body;
  const newUser = {
    email: userObj.email,
    password: userObj.password,
    confirmPassword: userObj.confirmPassword,
    username: userObj.username,
  }
  
  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  let token, userId;
  firestore.collection('users').doc(`${newUser.username}`)
    .get()
    .then(doc => {
      if(doc.exists) {
        return res.status(400).json({username: `This username already exists`});
      } else {
       return createUserWithEmailAndPassword(firebaseAuth, newUser.email, newUser.password)
      }
    })
    .then(data => {
      userId = data.user.uid
      return data.user.getIdToken();
      })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
        newUser: true
      };
      return firestore.collection('users').doc(`${newUser.username}`).set(userCredentials);
    })
    .then(() => {
      return res.status(200).json({ token })
    })
    .catch(err => {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          return res.status(400).json("email already in use")
        } else {
          return res.status(500).json({ error: err.code});
        }
        
      })
}

export const login = async (req, res) => {
  const userObj =  req.body;
  const user = {
    email: userObj.email,
    password: userObj.password
  }
  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  signInWithEmailAndPassword(firebaseAuth, user.email, user.password)
    .then(data => {
      console.log(data)
      return data.user.getIdToken();
    })
    .then(token => {
      console.log(token);
      return res.json({token})
    })
    .catch(err => {
      console.error(err);
      if (err.code === "auth/invalid-credential" || err.code === "auth/invalid-email" ) {
        return res.status(403).json({general: "invalid email or password."})
      } else {
        return res.status(500).json({ error: err.code });
      }
      
    })
}

export const getAuthenticatedUser = async (req, res) => {
  let userData = {};
  const userDoc = firestore.collection('users').doc(`${req.user.username}`);
  const doc = await userDoc.get();
  console.log(doc.exists);
  try {
    if (doc.exists) {
      userData.credentials = doc.data();
      console.log(userData)
    }
    return res.json(userData);
  } catch (err) {
    console.error(err);
      return res.status(500).json({ error: err.code });
  }
};

export const updateNewUserDetails = async (req, res) => {
  const doc = firestore.collection('users').doc(`${req.user.username}`);
  try {
    const updateUser = await doc.update({newUser: false});
    const userData = await doc.get();
    console.log(userData.data());
    return res.json(userData.data())
  } catch (err) {
    console.log(err)
  }
  
}
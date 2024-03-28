import { auth } from "./firebase";
import { 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
 } from "firebase/auth";

/**
 * Signs user up with their email and password
 * @param email -> users inputed email
 * @param password -> users inputted password
 * @returns a promise that resolves with user credentials
 */
export const signUpWithEmail = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const signInWithEmail = async (email, password) => {
 return signInWithEmailAndPassword(auth, email, password);
}

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);
  // TODO: store user in firestore.
  return res;
}

export const signOutUser = async () => {
  return auth.signOut();
}
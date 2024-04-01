import {initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";
import {getFirestore} from "firebase-admin/firestore";

const admin = initializeApp()
const adminFirebaseAuth = getAuth()
const firestore =  getFirestore();

export { admin, adminFirebaseAuth, firestore };
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore, Timestamp } from "firebase/firestore" 

const firebaseConfig = {
    apiKey: "AIzaSyDpcW15UrJ0EQzuNu32dokmXbZoxsWqcqM",
    authDomain: "stormwall-project-manager.firebaseapp.com",
    projectId: "stormwall-project-manager",
    storageBucket: "stormwall-project-manager.appspot.com",
    messagingSenderId: "681317751589",
    appId: "1:681317751589:web:d2a17a1169149ea75c98cc"
  };

//initialize 
const app = initializeApp(firebaseConfig)

//initialize services
const db = getFirestore(app)
const projectAuth = getAuth(app)
const projectStorage = getStorage(app)

//timestamp
const timestamp = new Timestamp()

//exports 
export { db, projectAuth, projectStorage, timestamp }


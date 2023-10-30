import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDpcW15UrJ0EQzuNu32dokmXbZoxsWqcqM",
    authDomain: "stormwall-project-manager.firebaseapp.com",
    projectId: "stormwall-project-manager",
    storageBucket: "stormwall-project-manager.appspot.com",
    messagingSenderId: "681317751589",
    appId: "1:681317751589:web:d2a17a1169149ea75c98cc"
  };

//initialize firebase
firebase.initializeApp(firebaseConfig)

//initialize services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

//timestamp
const timestamp = firebase.firestore.Timestamp

//exports
export { projectFirestore, projectAuth, timestamp }


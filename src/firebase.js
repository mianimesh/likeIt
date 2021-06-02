import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    apiKey: "AIzaSyC3H6bcPQ7DgMj5N-Kb13dOCwN5PqR3W0o",
    authDomain: "likeit-11ff4.firebaseapp.com",
    projectId: "likeit-11ff4",
    storageBucket: "likeit-11ff4.appspot.com",
    messagingSenderId: "8489677804",
    appId: "1:8489677804:web:41f52fb88ffd8c7bf9c6c9",
    measurementId: "G-NBPM0FG04K"

});

const db = firebase.firestore() ; 
const auth = firebase.auth() ;
const storage = firebase.storage() ; 

export {db,auth,storage} ;
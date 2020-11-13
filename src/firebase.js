import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const  firebaseConfig = {
    apiKey: "AIzaSyCt45-LYrtRlYv9jtNc4-XpJcOMSL0Z-ls",
    authDomain: "covid-statistics-3fcc4.firebaseapp.com",
    databaseURL: "https://covid-statistics-3fcc4.firebaseio.com",
    projectId: "covid-statistics-3fcc4",
    storageBucket: "covid-statistics-3fcc4.appspot.com",
    messagingSenderId: "122077635893",
    appId: "1:122077635893:web:dada2252ec1c70a8d9187c",
    measurementId: "G-BDT1SD78R7"
};


firebase.initializeApp(firebaseConfig);




//exports
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const signOut = () =>{
    auth.signOut()
        .then(() => console.log('signed out') );
}
export const signInWithGoogle = () => {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function() {
            var provider = new firebase.auth.GoogleAuthProvider();
            return firebase.auth().signInWithPopup(provider);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });

};

//create User table
export const generateUserDocument = async (user, additionalData) => {

    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};
const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

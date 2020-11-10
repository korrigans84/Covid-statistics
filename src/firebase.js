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

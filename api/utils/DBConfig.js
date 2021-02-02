require('dotenv').config();
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
//require("firebase/storage");

// Your web app's Firebase configuration
// var firebaseConfig = {
//     apiKey: `${process.env.apiKey}`,
//     authDomain: `${process.env.authDomain}`,
//     databaseURL: `${process.env.databaseURL}`,
//     projectId: `${process.env.projectId}`,
//     storageBucket: `${process.env.storageBucket}`,
//     messagingSenderId: `${process.env.messagingSenderId}`,
//     appId: `${process.env.appId}`,
//     measurementId: `${process.env.measurementId}`
// };

var firebaseConfig = {
    apiKey: `${process.env.apiKey}`,
    authDomain: `${process.env.authDomain}`,
    databaseURL: `${process.env.databaseURL}`,
    projectId: `${process.env.projectId}`,
    storageBucket: `${process.env.storageBucket}`,
    messagingSenderId: `${process.env.messagingSenderId}`,
    appId: `${process.env.appId}`
};

//,measurementId: `${process.env.measurementId}`
firebase.initializeApp(firebaseConfig);

module.exports = firebase
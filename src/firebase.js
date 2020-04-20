import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey           : 'AIzaSyB1JcA6cby06B6ULpC0CdE0o0yEz1-1fGw',
    authDomain       : 'react-slack-clone-b7e55.firebaseapp.com',
    databaseURL      : 'https://react-slack-clone-b7e55.firebaseio.com',
    projectId        : 'react-slack-clone-b7e55',
    storageBucket    : 'react-slack-clone-b7e55.appspot.com',
    messagingSenderId: '136339252897',
    appId            : '1:136339252897:web:2eafc3a2c773f7542bb2e0',
    measurementId    : 'G-XG39G3LSYE'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

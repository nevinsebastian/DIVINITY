import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCykjEctcsS24Q9yNwIU3rRAnFtK2Vb-gA",
  authDomain: "micht-cb218.firebaseapp.com",
  projectId: "micht-cb218",
  storageBucket: "micht-cb218.appspot.com",
  messagingSenderId: "345786806348",
  appId: "1:345786806348:web:32ba94dcf102fd3d3344e9"
};

let app;

if(firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth};

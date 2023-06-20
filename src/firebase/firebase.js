import * as firebase from "firebase";

const config = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "expense-manager-62883.firebaseapp.com",
  databaseURL: "https://expense-manager-62883-default-rtdb.firebaseio.com",
  projectId: "expense-manager-62883",
  storageBucket: "expense-manager-62883.appspot.com",
  messagingSenderId: "943185529623",
  appId: "1:943185529623:web:8525345066625b55938552"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { auth, db };

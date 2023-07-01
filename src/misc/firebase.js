import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const config = {
  apiKey: "AIzaSyBSD1gd-pN78NaAYl-oNYFNxvy6bF-eKYk",
  authDomain: "chat-web-app-2438.firebaseapp.com",
  databaseURL:
    "https://chat-web-app-2438-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-web-app-2438",
  storageBucket: "chat-web-app-2438.appspot.com",
  messagingSenderId: "686928272648",
  appId: "1:686928272648:web:ca7bcd45640eda4a1320bd",
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();

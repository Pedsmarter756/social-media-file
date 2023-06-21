import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyBSD1gd-pN78NaAYl-oNYFNxvy6bF-eKYk",
  authDomain: "chat-web-app-2438.firebaseapp.com",
  projectId: "chat-web-app-2438",
  storageBucket: "chat-web-app-2438.appspot.com",
  messagingSenderId: "686928272648",
  appId: "1:686928272648:web:ca7bcd45640eda4a1320bd",
};

const app = firebase.initializeApp(config);

export default app;

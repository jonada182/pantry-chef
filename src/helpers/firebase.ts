import firebase from "firebase/app";
import "firebase/auth";
import { FIREBASE_API_KEY } from "./constants";

if (typeof FIREBASE_API_KEY == "undefined") {
  throw (new Error("No Firebase API key defined"));
}

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY || "no_api_key",
  authDomain: "chatbot-api-413c5.firebaseapp.com",
  projectId: "chatbot-api-413c5",
  storageBucket: "chatbot-api-413c5.appspot.com",
  messagingSenderId: "207110484875",
  appId: "1:207110484875:web:19e36ac9c9e01a0ee1758e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;

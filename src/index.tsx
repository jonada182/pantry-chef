import { initializeApp } from "firebase/app";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./AuthContext";
import { FIREBASE_API_KEY } from "./helpers/constants";
import "./index.css";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "chatbot-api-413c5.firebaseapp.com",
  projectId: "chatbot-api-413c5",
  storageBucket: "chatbot-api-413c5.appspot.com",
  messagingSenderId: "207110484875",
  appId: "1:207110484875:web:19e36ac9c9e01a0ee1758e",
};

// Initialize Firebase
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

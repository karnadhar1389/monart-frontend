import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCG5O7dGkK3sO9m8cKYnQCII-4wKsfu6Rw",
  authDomain: "clayco-store.firebaseapp.com",
  projectId: "clayco-store",
  storageBucket: "clayco-store.firebasestorage.app",
  messagingSenderId: "167820185295",
  appId: "1:167820185295:web:44be8476eca80da0ba31ba"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
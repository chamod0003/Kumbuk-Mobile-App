import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAj38Fj_s758ah_C_6nyHCMgT7JFLjLGHk",
  authDomain: "kumbuk-9b61b.firebaseapp.com",
  projectId: "kumbuk-9b61b",
  storageBucket: "kumbuk-9b61b.appspot.com",
  messagingSenderId: "419908050247",
  appId: "1:419908050247:web:259cffb4a1365b8cb28062",
  measurementId: "G-0FXWD5SSM6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

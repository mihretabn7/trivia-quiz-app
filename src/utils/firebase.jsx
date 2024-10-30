// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBf-lsATZOp31eiLFpgw_ol2N8qcA1gQpE",
  authDomain: "interactive-trivia-game-bc1aa.firebaseapp.com",
  projectId: "interactive-trivia-game-bc1aa",
  storageBucket: "interactive-trivia-game-bc1aa.appspot.com",
  messagingSenderId: "452373990360",
  appId: "1:452373990360:web:1c46da4301538f693240ad",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize storage


// Use named exports instead of default export
export { auth, db,storage };
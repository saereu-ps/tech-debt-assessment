import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWG_AUCi5CReQrXiet37cj3OKnuFIVV44",
  authDomain: "mfec-dis-agentspace.firebaseapp.com",
  projectId: "mfec-dis-agentspace",
  storageBucket: "mfec-dis-agentspace.firebasestorage.app",
  messagingSenderId: "933239333231",
  appId: "1:933239333231:web:46007d8101d5f2631c489a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, serverTimestamp };

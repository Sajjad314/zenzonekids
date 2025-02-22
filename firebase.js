import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFzMO3pGsLiVkRAw-SMlzVU2vRzafRYpA",
  authDomain: "restaurant-bill-29886.firebaseapp.com",
  projectId: "restaurant-bill-29886",
  storageBucket: "restaurant-bill-29886.firebasestorage.app",
  messagingSenderId: "1053378303799",
  appId: "1:1053378303799:web:06260de4046f3834c46cb2",
  measurementId: "G-9TC4NGDB9K"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

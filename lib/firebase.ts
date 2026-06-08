import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3-xDVK6_JkIp3i7MSrk5cUW24EP51gHQ",
  authDomain: "chino-barber.firebaseapp.com",
  projectId: "chino-barber",
  storageBucket: "chino-barber.firebasestorage.app",
  messagingSenderId: "59431275052",
  appId: "1:59431275052:web:8c6cf304dbe9982318df89",
  measurementId: "G-MM2LJQHNHK",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;
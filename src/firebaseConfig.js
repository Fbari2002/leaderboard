import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBwTfbpVY-xPPlLP9TDMsauR5guoFfAXBg",
    authDomain: "fb-leaderboard-ab42d.firebaseapp.com",
    projectId: "fb-leaderboard-ab42d",
    storageBucket: "fb-leaderboard-ab42d.appspot.com",
    messagingSenderId: "44331163196",
    appId: "1:44331163196:web:02a2aa1a761fa0bc70ed39",
    measurementId: "G-03QQDRVL4X"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

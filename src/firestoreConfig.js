import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD9rZh8L6C-K0uhdr6S04_zu8O-RQeSuEA",
    authDomain: "ecowiser-c31c5.firebaseapp.com",
    databaseURL: "https://ecowiser-c31c5-default-rtdb.firebaseio.com",
    projectId: "ecowiser-c31c5",
    storageBucket: "ecowiser-c31c5.appspot.com",
    messagingSenderId: "146333554890",
    appId: "1:146333554890:web:339527af21885cc7f5fc33",
    measurementId: "G-2BPE57LEN2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
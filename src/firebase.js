import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyAOf-a8U-VtajckIDDAwxExysOZXbiQtaU",
    authDomain: "fir-user-reg-auth-af919.firebaseapp.com",
    projectId: "fir-user-reg-auth-af919",
    storageBucket: "fir-user-reg-auth-af919.appspot.com",
    messagingSenderId: "503658118139",
    appId: "1:503658118139:web:762ffed432d4a8c106a95e"
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };

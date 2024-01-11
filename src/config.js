import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDIgEJI-sNGhW23S_u_An9T_nmiBOS6-Ec",
  authDomain: "pomodor-79b14.firebaseapp.com",
  projectId: "pomodor-79b14",
  storageBucket: "pomodor-79b14.appspot.com",
  messagingSenderId: "39063451428",
  appId: "1:39063451428:web:5ff7ee211c2d6e2599e5b1",
  measurementId: "G-FZSWSPX6R7"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider= new GoogleAuthProvider()
export {auth,provider}
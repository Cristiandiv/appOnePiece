import { FirebaseError, initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyDHx2NCrhctt-m2_8wm3k6ZeUFifrP2us0",

  authDomain: "apponepiece.firebaseapp.com",

  projectId: "apponepiece",

  storageBucket: "apponepiece.appspot.com",

  messagingSenderId: "716020294905",

  appId: "1:716020294905:web:9f9b3a7578a7dfcb652e28"

};


  
  const app = initializeApp(firebaseConfig);
  export const storage = getStorage(app);
  export const fire = getFirestore(app);
  

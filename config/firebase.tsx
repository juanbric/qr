import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzaayxk-uUj8UN55FxGw_ipY61qmCU-gk",
  authDomain: "juanbri-qr.firebaseapp.com",
  projectId: "juanbri-qr",
  storageBucket: "juanbri-qr.appspot.com",
  messagingSenderId: "974572535736",
  appId: "1:974572535736:web:65721452a1e3a6e42c994d"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
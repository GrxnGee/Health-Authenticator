import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from 'firebase/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyBLJOgj7M5vwuKbwrC8u0kRAuNqDWI8uiE",
  authDomain: "ec-g-be3fe.firebaseapp.com",
  projectId: "ec-g-be3fe",
  storageBucket: "ec-g-be3fe.appspot.com",
  messagingSenderId: "1099116993565",
  appId: "1:1099116993565:web:270d44cc2de8cb340dfaf4"
};

const app = initializeApp(firebaseConfig);


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
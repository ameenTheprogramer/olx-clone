

import * as firebase from 'firebase/app'
import 'firebase/compat/auth';
import 'firebase/database'
import { getStorage } from 'firebase/storage';


export const firebaseConfig = {
    apiKey: "AIzaSyCd-bks9bbLWMxZjaEUyGgZpYKnu-gzwxw",
    authDomain: "demo1-3fca9.firebaseapp.com",
    projectId: "demo1-3fca9",
    storageBucket: "demo1-3fca9.appspot.com",
    messagingSenderId: "852343905290",
    appId: "1:852343905290:web:c1c111681f0c5841fa13f3",
    measurementId: "G-3NF3QEYHWC"
  };

  // export const db = Firebase.firestore()
  // const auth = firebase.auth
  
  // export const storageRef = firebase.initializeApp(firebaseConfig).getStorage().ref();
  export default firebase.initializeApp(firebaseConfig)



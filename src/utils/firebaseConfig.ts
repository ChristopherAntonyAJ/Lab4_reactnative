
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD_kUpbp349u2AvKsbFLwbLwhnjTPCZndA",
    authDomain: "mypwa-5fb18.firebaseapp.com",
    projectId: "mypwa-5fb18",
    storageBucket: "mypwa-5fb18.appspot.com",
    messagingSenderId: "662572084401",
    appId: "1:662572084401:web:dff7781d5ba43531fe0690",
    measurementId: "G-DJPD4RB8BN"
  };

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore };

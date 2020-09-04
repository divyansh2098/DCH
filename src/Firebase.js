import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCX1aC1EadgsLzK54s3zzWCQw3eupyxnss",
    authDomain: "dchweb-3eed9.firebaseapp.com",
    databaseURL: "https://dchweb-3eed9.firebaseio.com",
    projectId: "dchweb-3eed9",
    storageBucket: "dchweb-3eed9.appspot.com",
    messagingSenderId: "1039560007580",
    appId: "1:1039560007580:web:d5d9e7a9f14c4bb367b259",
    measurementId: "G-NBNH81T7TS"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase
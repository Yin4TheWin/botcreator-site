import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyA-qiNdiC8sszNPG2R53RybL3rghNsmq48",
    authDomain: "botmaker-801b9.firebaseapp.com",
    databaseURL: "https://botmaker-801b9-default-rtdb.firebaseio.com",
    projectId: "botmaker-801b9",
    storageBucket: "botmaker-801b9.appspot.com",
    messagingSenderId: "327336195543",
    appId: "1:327336195543:web:5f9e5a99ae0c28aa3b8792",
    measurementId: "G-ML5YWD0VJZ"
};

const firebase = initializeApp(firebaseConfig);

export {firebase }
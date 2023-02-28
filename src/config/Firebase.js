// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: process.env.React_App_Firebase_Api_key,
    authDomain: process.env.React_App_Firebase_AuthDomain,
    projectId: process.env.React_App_Firebase_ProjectId,
    storageBucket: process.env.React_App_Firebase_StorageBucket,
    messagingSenderId: process.env.React_App_Firebase_MessagingSenderId,
    appId: process.env.React_App_Firebase_AppId,
    measurementId: process.env.React_App_Firebase_MeasurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export { analytics, auth, firestore, storage }
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcPyUQYQbWcwGRlQN-8AR3AZPsvaCBENo",
  authDomain: "crm-app-df561.firebaseapp.com",
  projectId: "crm-app-df561",
  storageBucket: "crm-app-df561.appspot.com",
  messagingSenderId: "520311877747",
  appId: "1:520311877747:web:324002a015f230abb27a06",
  measurementId: "G-PV7NYTLBLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const imageDb = getStorage(app);
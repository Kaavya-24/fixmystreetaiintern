// /firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Import Firestore
import { getAnalytics, isSupported } from "firebase/analytics"; // optional

const firebaseConfig = {
  apiKey: "AIzaSyCuRk5F-AmeNe0cdT-fEdKFbXdc4ajqDmo",
  authDomain: "fix-my-streetai.firebaseapp.com",
  projectId: "fix-my-streetai",
  storageBucket: "fix-my-streetai.appspot.com", // ✅ Fixed typo here
  messagingSenderId: "268532866446",
  appId: "1:268532866446:web:4e2ea53ec4783883f6d8df",
  measurementId: "G-HTL203P4RY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Optional: If you need analytics on the client-side
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(app);
    }
  });
}

export { db };

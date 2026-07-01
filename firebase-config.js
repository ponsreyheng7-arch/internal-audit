// Firebase Configuration
// ⚠️ ដាក់ Firebase config របស់អ្នក នៅលើកម្ពូទ័រនេះ

const firebaseConfig = {
  apiKey: "AIzaSyDPK1LM-6ekEC6FVfRGFgdq7sFLOBRKnKU",
  authDomain: "internal-audit-clinic.firebaseapp.com",
  projectId: "internal-audit-clinic",
  storageBucket: "internal-audit-clinic.firebasestorage.app",
  messagingSenderId: "316370804867",
  appId: "1:316370804867:web:fbd3c04e5ebfe7a13ffbb6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firestore reference
const db = firebase.firestore();

// Collection name
const COLLECTION_NAME = "audit_issues";

console.log("Firebase initialized successfully!");

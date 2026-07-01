# 🔥 Firebase Setup Instructions

## ជំហាន 1: បង្កើត Firebase Project

1. ចូល https://firebase.google.com
2. Click **"Get Started"**
3. Click **"Create a project"**
4. បង្ហាលឈ្មោះគម្រោង: `internal-audit-clinic`
5. Click **"Continue"** → ដាច់ Google Analytics → Click **"Create project"**
6. រង់ចាំ 1-2 នាទី

---

## ជំហាន 2: បង្កើត Firestore Database

1. ក្នុង Firebase Console:
   - ឆ្វេង → **"Build"** → **"Firestore Database"**
2. Click **"Create Database"**
3. ជ្រើស **"Start in test mode"**
4. ជ្រើស Location: **"asia-southeast1"** (ដែលជិតបាំងកក)
5. Click **"Create"**

---

## ជំហាន 3: ចម្លងលេខលម្អិត Firebase

1. ក្នុង Firebase Console:
   - ឆ្វេង → **"Project Settings"** (ក្រចក)
2. ចូល **"General"** tab
3. រករ **"Your apps"** → Click ថាល់ `</>`
4. ចម្លង `firebaseConfig` ឯកតាលម្អិត៖

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## ជំហាន 4: Update firebase-config.js

1. បើក `firebase-config.js` ក្នុង project
2. ដាក់ firebase config ឯកតាលម្អិត ដែលអ្នកចម្លងមក
3. រក្សាទុក

ឧទាហរណ៍:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB3d8hV5k1m2n3o4p5q6r7s8t9u0v",
  authDomain: "internal-audit-clinic.firebaseapp.com",
  projectId: "internal-audit-clinic",
  storageBucket: "internal-audit-clinic.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

---

## ជំហាន 5: Push ទៅលើ GitHub

```bash
git add .
git commit -m "Integrate Firebase Firestore database"
git push
```

Vercel នឹងធ្វើបច្ចុប្បន្នភាពដោយស្វ័យប្រវត្តិ! 🚀

---

## ✅ ឥឡូវនេះ:

- ទិន្នន័យទាំងអស់ = រក្សាក្នុង **Firebase Firestore**
- គ្មាន LocalStorage
- សមាជិកទាំងអស់ = ឃើញទិន្នន័យដូចគ្នា
- ឧបសគ្គដែលថ្មីម = ដូចបង្ហាញក្នុង Firestore

---

## 🔒 Firestore Security Rules

**សម្រាប់ development (Test Mode):**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2024, 12, 31);
    }
  }
}
```

---

**សូម្បីបាន ឯកតាលម្អិត Firebase:**
- apiKey
- authDomain
- projectId
- storageBucket
- messagingSenderId
- appId

បន្ទាប់ដាក់ក្នុង `firebase-config.js` រួច Push to GitHub! ✨

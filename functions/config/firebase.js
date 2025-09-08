require('dotenv').config(); // load .env
const admin = require("firebase-admin");

// Parse service account from .env
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export Firestore and Auth
const db = admin.firestore();
const auth = admin.auth();

module.exports = { 
    db, 
    auth,
};
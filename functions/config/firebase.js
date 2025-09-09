const admin = require("firebase-admin");
const path = require("path");

// Only initialize if no app exists
if (!admin.apps.length) {
  const serviceAccount = require(path.resolve(__dirname, "../serviceAccountKey.json"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };

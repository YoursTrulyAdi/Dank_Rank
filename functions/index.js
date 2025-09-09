const express = require("express");
const cors = require("cors");
const { db, auth } = require("./config/firebase"); // Reuse initialized Firebase
const jwt = require("jsonwebtoken");
const { FieldValue } = require("firebase-admin/firestore"); // for increment
require("dotenv").config();


const app = express();
app.use(cors());
app.use(express.json());

// ✅ use real env var, not string
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // store user info
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

// Test route
app.get("/", (req, res) => {
  res.send("Backend with Firebase is working!");
});

app.post("/auth/token", async (req, res) => {
  const { firebaseToken } = req.body;

  try {
    const decodedToken = await auth.verifyIdToken(firebaseToken); // use auth from config
    const backendJWT = jwt.sign(
      { uid: decodedToken.uid, email: decodedToken.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ jwt: backendJWT });
  } catch (err) {
    res.status(401).json({ message: "Invalid Firebase token" });
  }
});

// Protected route
app.post("/vote", authenticateJWT, async (req, res) => {
  const { memeId, voteType } = req.body; // voteType = "upvote" or "downvote"
  const userId = req.user.uid;

  try {
    const memeRef = db.collection("memes").doc(memeId);
    const userVoteRef = db.collection("votes").doc(`${memeId}_${userId}`);

    const userVoteDoc = await userVoteRef.get();
    if (userVoteDoc.exists) {
      return res.status(400).json({ message: "You have already voted on this meme" });
    }

    // Record user's vote
    await userVoteRef.set({
      memeId,
      userId,
      voteType,
      timestamp: Date.now(),
    });

    // Increment/decrement meme vote count
    await memeRef.update({
      voteCount: voteType === "upvote"
        ? FieldValue.increment(1)
        : FieldValue.increment(-1),
    });

    res.json({ message: `${voteType} registered successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Port definition
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

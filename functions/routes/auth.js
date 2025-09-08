const express = require("express");
const router = express.Router();
const { auth } = require("../config/firebase"); // import Firebase Auth

// ------------------------
// Signup Route
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Create user in Firebase Auth
        const userRecord = await auth.createUser({
            email,
            password,
            displayName: name,
        });

        res.status(201).json({
            message: "User created successfully",
            uid: userRecord.uid,
            email: userRecord.email,
            name: userRecord.displayName,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// ------------------------
// Login Route
// ------------------------
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Note: Firebase Admin SDK does not handle login directly.
    // Login is usually handled on the frontend with Firebase Client SDK.
    res.status(501).json({ error: "Login should be handled on the frontend using Firebase SDK." });
});

module.exports = router;

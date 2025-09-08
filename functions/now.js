const admin = require("firebase-admin");
require('dotenv').config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// The memes array
const memes = [
    {
        title: "Real",
        imageUrl: "https://i.redd.it/i2ad6pwe5enf1.png",
        creatorId: "admin",
        creatorName: "Admin",
        voteCount: 0
    },
    {
        title: "Yes I did it",
        imageUrl: "https://i.redd.it/x787jq9eexnf1.png",
        creatorId: "admin",
        creatorName: "Admin",
        voteCount: 0
    },
    {
        title: "Fun things are often wretched and villainous.",
        imageUrl: "https://i.redd.it/irsj8j3l0snf1.png",
        creatorId: "admin",
        creatorName: "Admin",
        voteCount: 0
    },
    {
        title: "Oh man",
        imageUrl: "https://i.redd.it/obgfuoj4lcnf1.png",
        creatorId: "admin",
        creatorName: "Admin",
        voteCount: 0
    },
    {
        title: "Wendelstein 7X is cool tho",
        imageUrl: "https://i.redd.it/xroq7qd7ronf1.png",
        creatorId: "admin",
        creatorName: "Admin",
        voteCount: 0
    },
    {
        title: "I've never felt so disgraced",
        imageUrl: "https://i.redd.it/9zumanjzzmnf1.png",
        creatorId: "admin",
        creatorName: "Admin",
        voteCount: 0
    },
    {
        title: "You just know it's going to happen.",
        imageUrl: "https://i.redd.it/l601y9x5alnf1.png",
        creatorId: "admin",
        creatorName: "Admin",
        voteCount: 0
    }
];

async function addMemes() {
    try {
        for (const meme of memes) {
            await db.collection("memes").add(meme);
            console.log(`Added meme: ${meme.title}`);
        }
        console.log("All memes added successfully!");
    } catch (err) {
        console.error("Error adding memes:", err);
    }
}

addMemes();

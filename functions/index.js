const express = require("express");
const cors = require("cors");
const { db, auth } = require("./firebase"); // import Firebase

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend with Firebase is working!");
});

// Example route using Firestore



//port definition
app.listen(process.env.PORT);
# Dank Rank ⚔️

A modern meme platform where users can **upload, vote, and track trending memes**. Fully responsive and packed with interactive features!  

---

## 📌 How to Run Locally
```bash
# Clone the repo
git clone https://github.com/YoursTrulyAdi/Dank_Rank.git

# to go to the main-program directory
cd client

# To Install all the required libraries
npm install

# Finally run the WebApp
npm run dev
```

## 🔗 Live Demo
[https://drive.google.com/file/d/1DIxc4bh4KhojWjU3eGIw2Xxlrxsujq1w/view?usp=sharing]

## 🛜 Hosted on
[https://dank-rank.vercel.app/]


---

## 📸 Screenshots
<!-- Add your screenshots here -->
### Main feed
![Meme Feed](/readmeFIles/mainfeed.png)

### User Dashboard
![User Dashboard](/readmeFIles/userdashboard.png)

### Admin Dashboard
![Admin Dashboard](/readmeFIles/admindashboard.png)

### User Sign Up
![User Sign Up](/readmeFIles/usersignup.png)

### User Sign In
![User Sign In](/readmeFIles/usersignup.png)

### Admin Sign In
![Admin Sign In](/readmeFIles/adminsignin.png)

---

## 🛠 Features

### 1. Frontend
- **Meme Feed (grid/list)**  
  - Display meme **images**
  - **Caption** for meme
  - Upvote & Downvote buttons with **live vote count**
  - Fully **responsive**  
  - **Leaderboard** Page (Top 5 memes by votes)

---

### 2. Backend
- **Authentication & Protected Routes**  
  - User Auth (register, login, profile)  
  - Full Authorization using Firebase 

  > Public: Can View memes, Can View leaderboard  
    Protected: **Upload meme**, vote  
    Admin: **Delete** meme  

- **CRUD Operations for Memes**  
  - GET  → **Retrieve all** memes  
  - POST  → **Add new** meme  
  - PUT  → Vote (**up/down**)  
  - DELETE  → **Remove** meme (admin only)  

- **Voting Rules**  
  - **One vote per user per meme** (toggle allowed)  

- **Leaderboard Endpoint**  
  - **Top 5** memes by net **vote count**
 

---

## 🛠 Tech Stack
- **Frontend:** Vite+React, TailwindCSS  
- **Backend:** Firebase 
- **Database:** Firebase  
- **Auth:** Firebase Auth
- **Hosting/Deployment:** Vercel
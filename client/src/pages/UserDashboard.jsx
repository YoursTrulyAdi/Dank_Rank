import React, { useState, useEffect } from "react";
import MemeCard from "../components/MemeCard";
import LeaderboardCard from "../components/LeaderboardCard";
import { db, auth } from "../../firebase/firebase";
import { collection, getDocs, doc, updateDoc, increment } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";

function UserDashboard() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/"); // redirect if not signed in
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch memes
  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const memesCollection = collection(db, "memes");
        const memesSnapshot = await getDocs(memesCollection);
        const memesList = memesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMemes(memesList);
      } catch (error) {
        console.error("Error fetching memes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMemes();
  }, []);

  const signout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const handleUpvote = async (memeId) => {
    if (!auth.currentUser) return alert("You must be signed in to vote!");

    const memeRef = doc(db, "memes", memeId);
    await updateDoc(memeRef, { voteCount: increment(1) });

    setMemes((prev) =>
      prev.map((m) => (m.id === memeId ? { ...m, voteCount: m.voteCount + 1 } : m))
    );
  };

  const handleDownvote = async (memeId) => {
    if (!auth.currentUser) return alert("You must be signed in to vote!");

    const memeRef = doc(db, "memes", memeId);
    await updateDoc(memeRef, { voteCount: increment(-1) });

    setMemes((prev) =>
      prev.map((m) => (m.id === memeId ? { ...m, voteCount: m.voteCount - 1 } : m))
    );
  };

  if (loading) return <p>Loading memes...</p>;

  return (
    <div>
      <nav className="flex justify-evenly items-center px-6 py-4 shadow-md bg-[#191830]">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex gap-3 items-center justify-center">
          Dank Rank
          <img src="/logo.png" alt="logo" className="w-10" />
        </h1>
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 rounded-xl bg-[#f75990] text-white font-bold transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={signout}
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="bg-[#2d2b55] text-gray-900 dark:text-gray-100 p-6 h-[93vh]">
        <div className="flex h-fit gap-10">
          {/* Profile */}
          <div className="h-[85vh] basis-[30%]">
            <div className="bg-[#191830] p-6 shadow-md text-center h-auto rounded-xl">
              <h3 className="text-2xl font-semibold mb-2">Profile</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome, {auth.currentUser?.displayName || "User"}!
              </p>
            </div>
          </div>

          {/* View Memes */}
          <div className="h-[85vh] basis-[40%] overflow-y-scroll scroll-hide='true'">
            <div className="bg-[#191830] p-10 shadow-md text-center min-h-0 rounded-xl">
              <div className="space-y-9">
                {memes.map((meme) => (
                  <MemeCard
                    key={meme.id}
                    meme={meme}
                    onUpvote={() => handleUpvote(meme.id)}
                    onDownvote={() => handleDownvote(meme.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="h-[85vh] basis-[30%]">
            <div className="bg-[#191830] p-6 shadow-md text-center h-auto rounded-xl">
              <h3 className="text-2xl font-semibold mb-2">Leaderboard</h3>
              <div>
                {memes
                  .sort((a, b) => b.voteCount - a.voteCount)
                  .slice(0, 5)
                  .map((meme, index) => (
                    <LeaderboardCard
                      key={meme.id}
                      meme={{ ...meme, rank: index + 1 }}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;

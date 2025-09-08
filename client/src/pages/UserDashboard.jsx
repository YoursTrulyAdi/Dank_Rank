import React, { useState, useEffect } from "react";
import MemeCard from "../components/MemeCard";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function UserDashboard() {
    const [memes, setMemes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch memes from Firestore
    useEffect(() => {
        const fetchMemes = async () => {
            try {
                const memesCollection = collection(db, "memes");
                const memesSnapshot = await getDocs(memesCollection);
                const memesList = memesSnapshot.docs.map(doc => ({
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

    const handleUpvote = (id) => {
        console.log("Upvote:", id);
        // You can update Firestore here if needed
    };

    const handleDownvote = (id) => {
        console.log("Downvote:", id);
        // You can update Firestore here if needed
    };

    if (loading) return <p>Loading memes...</p>;

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-800 fixed top-0 left-0 w-full">
                {/* Logo / Title */}
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Meme Voting Arena 🎭
                </h1>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-green-600">
                        Sign Out
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:opacity-80 text-amber-600">
                        🌙/☀️
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gray-300 hover:ring-2 hover:ring-green-500">
                        <img
                            src="https://i.pinimg.com/736x/36/95/37/369537d07faab72506f1325d42e650bc.jpg"
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </button>

                </div>
            </nav>

            {/* Main UserDashboard Content */}
            <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 my-18">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    User Dashboard
                </h2>

                <div className="flex gap-6">
                    {/* Profile */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center basis-[30%]">
                        <h3 className="text-xl font-semibold mb-2">Profile</h3>
                        <p className="text-gray-600 dark:text-gray-400">View or update your account details.</p>
                    </div>

                    {/* View Memes */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center basis-[40%]">
                        <h3 className="text-xl font-semibold mb-2">View Memes</h3>
                        <p className="text-gray-600 dark:text-gray-400">Browse all uploaded memes here.</p>

                        <div>
                            {memes.map((meme) => (
                                <MemeCard
                                    key={meme.id}
                                    meme={{
                                        title: meme.title,
                                        url: meme.imageUrl,
                                        voteCount: meme.voteCount,
                                    }}
                                    onUpvote={handleUpvote}
                                    onDownvote={handleDownvote}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center basis-[30%]">
                        <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
                        <p className="text-gray-600 dark:text-gray-400">Check top voted memes.</p>
                    </div>
                </div>

            </main>
        </div>
    );
}

export default UserDashboard;

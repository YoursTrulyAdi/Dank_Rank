import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import MemeCard from "../components/MemeCard";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import LeaderboardCard from "../components/LeaderboardCard";


function HomePage() {
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
        alert("Please Sign In To Cast Your Vote.")
    };

    const handleDownvote = (id) => {
        alert("Please Sign In To Cast Your Vote.")
    };

    if (loading) return <p>Loading memes...</p>;

    return (
        <div scroll-hide="true">
            {/* Navbar */}
            <Navbar />

            {/* Main UserDashboard Content */}
            <main className="bg-[#2d2b55] text-gray-900 dark:text-gray-100 p-6 h-[93vh] ">

                <div className="flex h-fit gap-10">
                    {/* Profile */}
                    <div className="h-[85vh] basis-[30%]">
                        <div className="bg-[#191830] p-6 shadow-md text-center h-auto rounded-xl">
                            <h3 className="text-2xl font-semibold mb-2">Profile</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Sign In / Sign Up to view your Dank Rank 😉
                            </p>
                        </div>
                    </div>

                    {/* View Memes (scrollable) */}
                    <div className="h-[85vh] basis-[40%] overflow-y-scroll scroll-hide='true'">
                        <div className="bg-[#191830] p-10 shadow-md text-center min-h-0 rounded-xl">
                            <div className="space-y-9">
                                {memes.map((meme) => (
                                    <MemeCard
                                        key={meme.id}
                                        meme={{
                                            title: meme.title,
                                            imageUrl: meme.imageUrl,
                                            postLink: meme.postLink,
                                            voteCount: meme.voteCount,
                                        }}
                                        onUpvote={handleUpvote}
                                        onDownvote={handleDownvote}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="h-[85vh] basis-[30%]">
                        <div className="bg-[#191830] p-6 shadow-md text-center h-auto rounded-xl">
                            <h3 className="text-2xl font-semibold mb-2">Leaderboard</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Check top voted memes.
                            </p>

                            <div>
                                {memes
                                    .sort((a, b) => b.voteCount - a.voteCount) // Sort descending by votes
                                    .slice(0, 5) // Take top 5
                                    .map((meme, index) => (
                                        <LeaderboardCard
                                            key={index} // use index or a unique id if available
                                            meme={{
                                                imageUrl: meme.imageUrl,
                                                title: meme.title,
                                                postLink: meme.postLink,
                                                voteCount: meme.voteCount,
                                                rank: index + 1,
                                            }}
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

export default HomePage;

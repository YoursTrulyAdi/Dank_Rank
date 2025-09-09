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
        //  className="overflow-hidden"
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main UserDashboard Content */}
            <main className="bg-[#2d2b55] text-white p-6 flex justify-center gap-10">

                {/* [@media(min-width:850px)]: */}

                <div className="flex h-fit flex-col items-center gap-10 w-[85vw] lg:w-[90vw] lg:flex-row">

                    {/* Profile */}
                    <div className="h-max lg:h-[85vh] w-full lg:w-[30%]">
                        <div className="bg-[#191830] p-6 shadow-md text-center h-auto rounded-xl">
                            <h3 className="text-2xl font-semibold mb-2">Profile</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Sign In / Sign Up to view your Dank Rank 😉
                            </p>
                        </div>
                    </div>

                    {/* View Memes (scrollable) */}
                    <div className="h-[85vh] w-full lg:w-[45%] overflow-y-scroll">
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
                    <div className="h-max lg:h-[85vh] w-full lg:w-[35%]">
                        <div className="bg-[#191830] p-6 shadow-md text-center h-auto rounded-xl">
                            <h3 className="text-2xl font-semibold mb-2">Leaderboard</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Check top voted memes.
                            </p>

                            <div className="w-full flex flex-col items-center">
                                {memes
                                    .sort((a, b) => b.voteCount - a.voteCount)
                                    .slice(0, 5)
                                    .map((meme, index) => (
                                        <LeaderboardCard
                                            key={index}
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




            </main >
        </div >
    );
}

export default HomePage;

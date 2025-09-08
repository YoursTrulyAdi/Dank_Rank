import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import MemeCard from "../components/MemeCard";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";


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
        console.log("Upvote:", id);
        // You can update Firestore here if needed
    };

    const handleDownvote = (id) => {
        console.log("Downvote:", id);
        // You can update Firestore here if needed
    };

    if (loading) return <p>Loading memes...</p>;

    return (
        <div scroll-hide>
            {/* Navbar */}
            <Navbar />

            {/* Main UserDashboard Content */}
            <main className="bg-[#2d2b55] text-gray-900 dark:text-gray-100 p-6 h-[93vh] ">

                <div className="flex h-fit gap-10">
                    {/* Profile */}
                    <div className="h-[85vh] basis-[30%]">
                        <div className="bg-[#191830] p-6 shadow-md text-center h-auto rounded-xl">
                            <h3 className="text-xl font-semibold mb-2">Profile</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                View or update your account details.
                            </p>
                        </div>
                    </div>

                    {/* View Memes (scrollable) */}
                    <div className="h-[85vh] basis-[40%] overflow-y-scroll scroll-hide">
                        <div className="bg-[#191830] p-10 shadow-md text-center min-h-0 rounded-xl">
                            <div className="space-y-9">
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
                    </div>

                    {/* Leaderboard */}
                    <div className="h-[85vh] basis-[30%]">
                        <div className="bg-[#191830] p-6 shadow-md text-center h-auto rounded-xl">
                            <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Check top voted memes.
                            </p>
                        </div>
                    </div>
                </div>




            </main>
        </div>
    );
}

export default HomePage;

import React from "react";
import Navbar from "../components/NavBar";

function HomePage() {
    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main Section */}
            <main className="flex flex-col items-center justify-center py-20 text-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
                <h2 className="text-3xl font-bold mb-4">
                    Welcome to Meme Voting Arena 🎉
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
                    Upload your funniest memes, vote for the best, and see who tops the leaderboard.
                    Let the meme battles begin!
                </p>
            </main>
        </div>
    );
}

export default HomePage;

import React from "react";
import Navbar from "../components/NavBar";

function UserDashboard() {
    return (
        <div>
            {/* Navbar */}
            <Navbar />

            {/* Main UserDashboard Content */}
            <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    User Dashboard
                </h2>

                {/* Sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* View Memes Section */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold mb-2">View Memes</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Browse all uploaded memes here.
                        </p>
                    </div>

                    {/* Leaderboard Section */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Check top voted memes.
                        </p>
                    </div>

                    {/* Profile / Sections */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold mb-2">Profile</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            View or update your account details.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default UserDashboard;

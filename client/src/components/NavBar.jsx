import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleUserSignUp = () => {
        navigate("/user/signup"); // redirects to usersignup page
    };
    const handleUserSignIn = () => {
        navigate("/user/signin"); // redirects to usersignup page
    };

    return (
        <div>
            <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-800">
                {/* Logo / Title */}
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    Meme Voting Arena 🎭
                </h1>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600" onClick={handleUserSignIn}>
                        Sign In
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600" onClick={handleUserSignUp}>
                        Sign Up
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:opacity-80 text-amber-600">
                        🌙/☀️
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

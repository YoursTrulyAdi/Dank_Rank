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
            <nav className="flex justify-evenly items-center px-6 py-4 shadow-md bg-[#191830]">
                {/* Logo / Title */}
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex gap-3 items-center justify-center">
                    Dank Rank 
                    <img src="/logo.png" alt="logo" className="w-10"/>
                </h1>

                {/* Buttons */}
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 rounded-xl bg-[#f75990] text-white font-bold transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={handleUserSignIn}>
                        Sign In
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-[#f75990] text-white font-bold transition-transform duration-300 hover:scale-105 cursor-pointer" onClick={handleUserSignUp}>
                        Sign Up
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;

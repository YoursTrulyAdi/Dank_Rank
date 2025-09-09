import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

function AdminSignIn() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Email & Password login
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // User is logged in, navigate to dashboard
            navigate("/user/dashboard");

        } catch (error) {
            console.error("Email login failed:", error.code, error.message);
            alert("Invalid email or password.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    Welcome Admin
                </h2>

                {/* Email login form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-[#f75990] text-white font-bold transition-transform duration-300 hover:scale-105 cursor-pointer">
                        Sign In
                    </button>

                    <div className="text-white">
                        Are you A User?
                        <a href="/user/signin" className="italic text-[#f75990] hover:underline"> User Sign In </a>
                        Instead
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminSignIn;
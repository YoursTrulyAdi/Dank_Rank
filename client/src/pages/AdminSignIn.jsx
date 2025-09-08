import React, { useState } from "react";

function AdminSignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // 👉 Here you’ll integrate with backend later
    };

    //removed the google signin only for admin
    // const handleGoogleSignIn = () => {
    //     console.log("Google Sign-In clicked");
    //     // 👉 Integrate Firebase Google Auth here later
    // };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    Welcome Back!
                </h2>

                {/* AdminSign In Form */}
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
                        className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600">
                        Sign In
                    </button>
                </form>


                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
                    <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
                        OR
                    </span>
                    <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
                </div>

                {/* ----------------------------------------------------------------------------------------------------------------- */}
                {/* maybe removing the feature only for admin */}
                {/* Google Sign In */}
                {/* <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-2 rounded-lg border flex items-center justify-center gap-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-100"
                >
                    <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Sign in with Google
                </button> */}
            </div>
        </div>
    );
}

export default AdminSignIn;
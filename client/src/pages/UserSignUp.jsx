import React, { useState } from "react";
import { auth } from "../../firebase/firebase"; // use this only
import { useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";



function UserSignUp() {
    //initializing the navigate functions
    const navigate = useNavigate();

    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            await updateProfile(auth.currentUser, {
                displayName: formData.name, //we can also add the profile photo url here
            })

            navigate("/user/dashboard");

        }catch(error) {
            console.error("Email and Password Singup failed", error.code, error.message);
            alert(`Error: ${error.message}`); // optional: show error to userconsole.err
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // Access user info
            const user = result.user;
            console.log("Google Sign-In successful:", user);
        } catch (error) {
            console.error("Google Sign-In failed:", error.code, error.message);
            alert(`Error: ${error.message}`); // optional: show error to user
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    Create an Account
                </h2>

                {/* UserSign Up Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
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
                        Sign Up
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

                {/* Google Sign In */}
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-2 rounded-lg border flex items-center justify-center gap-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-100"
                >
                    <img
                        src="https://www.svgrepo.com/show/355037/google.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
}

export default UserSignUp;
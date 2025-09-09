import React, { useState } from "react";
import { auth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

function UserSignIn() {
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

  // Google login
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Logged in User Successfull");

      // User is logged in, navigate to dashboard
      navigate("/user/dashboard");

    } catch (error) {
      console.error("Google Sign-In failed:", error.code, error.message);
      alert("Google Sign-In failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Welcome Back!
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

export default UserSignIn;
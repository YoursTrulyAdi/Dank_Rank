import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage'
import UserSignUp from './pages/UserSignUp'
import UserSignIn from './pages/UserSignIn';
import UserDashboard from './pages/UserDashboard';

import AdminSignIn from './pages/AdminSignIn';

import './App.css';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/user/signup" element={<UserSignUp />} />
                <Route path="/user/signin" element={<UserSignIn />} />
                <Route path="/user/dashboard" element={<UserDashboard />} />

                <Route path="/admin/signin" element={<AdminSignIn />} />
            </Routes>
        </Router>
    )
}

export default App
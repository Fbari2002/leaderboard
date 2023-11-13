// Import necessary libraries and components
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultStack from './DefaultStack';
import AuthenticatedStack from './AuthenticatedStack';
import SignUp from './SignUpPage';

// Main App component
function App() {
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/leaderboard" element={<DefaultStack />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Private routes */}
                <Route path="/dashboard" element={<AuthenticatedStack />} />

                {/* Add more routes as needed */}
            </Routes>
        </Router>
    );
}

export default App;

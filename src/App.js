import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultStack from './DefaultStack';
import AuthenticatedStack from './AuthenticatedStack';
import SignUp from './SignUpPage';

function App() {
    // TODO figure out firebase auth hook that determines default/authenticated
    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/leaderboard" element={<DefaultStack />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Private routes */}
                <Route path="/dashboard" element={<AuthenticatedStack />} />
            </Routes>
        </Router>
    );
}

export default App;

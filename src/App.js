// App.js
import React from 'react';
import { BrowserRouter as Router, HashRouter, Routes, Route } from 'react-router-dom';
import DefaultStack from './DefaultStack';
import AuthenticatedStack from './AuthenticatedStack';
import SignUp from './SignUpPage';
import { useAuthentication } from './UseAuth';
import ProtectedRoute from './ProtectedRoute';

function App() {
    const { user } = useAuthentication();

    // Check if the app is deployed to GitHub Pages
    const isGitHubPages = process.env.PUBLIC_URL.includes('github.io');

    // Use BrowserRouter locally and HashRouter on GitHub Pages
    const RouterComponent = isGitHubPages ? HashRouter : Router;

    // Set the basename for GitHub Pages
    const basename = isGitHubPages ? '/leaderboard' : '/';

    return (
        <RouterComponent basename={basename}>
            <Routes>
                {/* Public routes */}
                <Route path="leaderboard" element={<DefaultStack />} />
                <Route path="leaderboard/signup" element={<SignUp />} />

                {/* Private routes */}
                <Route
                    path="leaderboard/dashboard"
                    element={
                        <ProtectedRoute user={user}>
                            <AuthenticatedStack />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </RouterComponent>
    );
}

export default App;

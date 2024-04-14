import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import DefaultStack from './DefaultStack';
import AuthenticatedStack from './AuthenticatedStack';
import SignUp from './SignUpPage';
import {useAuthentication} from "./UseAuth";
import ProtectedRoute from "./ProtectedRoute";
import CreateEditBoard from "./CreateEditBoard";
import CompleteProfile from "./CompleteProfile";
import ViewBoard from "./ViewAllBoards";

function App() {
    const {user} = useAuthentication();

    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/leaderboard" element={<DefaultStack/>}/>
                <Route path="/leaderboard/signup" element={<SignUp/>}/>

                {/* Private routes */}
                <Route path="/leaderboard/dashboard" element={
                    <ProtectedRoute user={user}>
                        <AuthenticatedStack/>
                    </ProtectedRoute>
                }/>

                <Route path="/leaderboard/createLeaderboard" element={
                    <ProtectedRoute user={user}>
                        <CreateEditBoard user={user}/>
                    </ProtectedRoute>
                }/>

                <Route path="/leaderboard/completeProfile" element={
                    <ProtectedRoute user={user}>
                        <CompleteProfile user={user}/>
                    </ProtectedRoute>
                }/>

                <Route path="/leaderboard/viewBoard" element={
                    <ProtectedRoute user={user}>
                        <ViewBoard user={user}/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </Router>
    );
}

export default App;

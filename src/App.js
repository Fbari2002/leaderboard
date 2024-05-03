import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginRegisterPage from "./LoginRegisterPage";
import Dashboard from './Dashboard';
import SignUp from './SignUpPage';
import {useAuthentication} from "./UseAuth";
import ProtectedRoute from "./ProtectedRoute";
import CreateEditBoard from "./CreateEditBoard";
import Profile from "./Profile";
import ViewBoard from "./ViewAllBoards";
import SideBar from "./SideBar";
import {UserContext, useUserContext} from "./userContext";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebaseConfig";
import {useAuthState} from "react-firebase-hooks/auth";

function App() {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return "loading...";
    }

    return (
        <UserContext.Provider value={user}>
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<LoginRegisterPage/>}/>
                <Route path="/signup" element={<SignUp/>}/>

                {/* Private routes */}
                <Route path="/dashboard" element={
                    <ProtectedRoute user={user}>
                        <SideBar/>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>

                <Route path="/createLeaderboard" element={
                    <ProtectedRoute user={user}>
                        <SideBar/>
                        <CreateEditBoard user={user}/>
                    </ProtectedRoute>
                }/>

                <Route path="/profile" element={
                    <ProtectedRoute user={user}>
                        <SideBar/>
                        <Profile/>
                    </ProtectedRoute>
                }/>

                <Route path="/viewBoard" element={
                    <ProtectedRoute user={user}>
                        <SideBar/>
                        <ViewBoard user={user}/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </Router>
        </UserContext.Provider>
    );
}

export default App;

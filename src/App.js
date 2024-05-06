import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginRegisterPage from "./LoginRegisterPage";
import Dashboard from './Dashboard';
import SignUp from './SignUpPage';
import ProtectedRoute from "./ProtectedRoute";
import CreateEditBoard from "./CreateEditBoard";
import Profile from "./Profile";
import ViewBoard from "./ViewAllBoards";
import SideBar from "./SideBar";
import {UserContext} from "./userContext";
import {auth} from "./firebaseConfig";
import {useAuthState} from "react-firebase-hooks/auth";
import LandingPage from "./LandingPage";

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
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/login" element={<LoginRegisterPage/>}/>
                <Route path="/register" element={<SignUp/>}/>

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
                        <CreateEditBoard/>
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
                        <ViewBoard/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </Router>
        </UserContext.Provider>
    );
}

export default App;

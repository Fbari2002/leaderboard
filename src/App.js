import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import DefaultStack from './DefaultStack';
import Dashboard from './Dashboard';
import SignUp from './SignUpPage';
import {useAuthentication} from "./UseAuth";
import ProtectedRoute from "./ProtectedRoute";
import CreateEditBoard from "./CreateEditBoard";
import Profile from "./Profile";
import ViewBoard from "./ViewAllBoards";
import SideBar from "./SideBar";

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
                        <SideBar/>
                        <Dashboard/>
                    </ProtectedRoute>
                }/>

                <Route path="/leaderboard/createLeaderboard" element={
                    <ProtectedRoute user={user}>
                        <SideBar/>
                        <CreateEditBoard user={user}/>
                    </ProtectedRoute>
                }/>

                <Route path="/leaderboard/profile" element={
                    <ProtectedRoute user={user}>
                        <SideBar/>
                        <Profile/>
                    </ProtectedRoute>
                }/>

                <Route path="/leaderboard/viewBoard" element={
                    <ProtectedRoute user={user}>
                        <SideBar/>
                        <ViewBoard user={user}/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </Router>
    );
}

export default App;

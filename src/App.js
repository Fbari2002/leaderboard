import React from 'react';
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

function App() {
    const {user} = useAuthentication();

    return (
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
    );
}

export default App;

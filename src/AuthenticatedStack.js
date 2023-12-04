import React from "react";
import Sidebar from "./SideBar";
import Dashboard from "./Dashboard"

function AuthenticatedStack() {
    return (
        <div style={{
            backgroundColor: '#ebe6e5',
            display: 'flex',
            flexDirection: 'row',
        }}>
            <Sidebar/>
            <Dashboard/>
        </div>

    );
}

export default AuthenticatedStack;
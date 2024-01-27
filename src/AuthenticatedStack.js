import React from "react";
import Sidebar from "./SideBar";
import Dashboard from "./Dashboard"

function AuthenticatedStack({user}) {
    return (
        <div style={{
            backgroundColor: '#ebe6e5',
            display: 'flex',
            flexDirection: 'row',
        }}>
            <Sidebar/>
            <Dashboard user={user}/>
        </div>

    );
}

export default AuthenticatedStack;
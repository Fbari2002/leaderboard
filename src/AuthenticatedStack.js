import React from "react";
import Sidebar from "./SideBar";
import Dashboard from "./Dashboard";

function AuthenticatedStack({user}) {
    return (
        <>
            <Sidebar/>
            <Dashboard user={user}/>
        </>
    );
}

export default AuthenticatedStack;
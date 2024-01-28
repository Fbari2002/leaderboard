import React from "react";
import Sidebar from "./SideBar";

function CreateBoard() {
    return (
        <div style={{
            backgroundColor: '#ebe6e5',
            display: 'flex',
            flexDirection: 'row',
        }}>
            <Sidebar/>
        </div>

    );
}

export default CreateBoard;
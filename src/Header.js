import React from "react";
import SideBar from "./SideBar";
import ProfileIcon from "./ProfileIcon";

const Header = () => {
    return (
        <div className={"inline-flex items-center justify-between w-full py-1 px-2 bg-white"}>
            <SideBar/>
            <ProfileIcon/>
        </div>
    );
    
}

export default Header;
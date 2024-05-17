import React, {useEffect, useState} from "react";
import {useUserContext} from "./userContext";
import {useNavigate} from "react-router-dom";

const ProfileIcon = () => {
    const user = useUserContext();
    const [profilePic, setProfilePic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfilePic = async () => {
            const picUrl = user ? user.photoURL : null;
            setProfilePic(picUrl);
        };

        fetchProfilePic();

    }, [user]);

    const handleOnClick = () => {
        navigate('/profile');
    }

    return (
        <div onClick={handleOnClick}>
            {profilePic && (
                <img
                    src={profilePic}
                    alt="Profile Pic"
                    className="w-12 h-12 rounded-full mx-auto mb-4 shadow-md float-right"
                />
            )}
        </div>
    );
}

export default ProfileIcon;
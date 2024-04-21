import React, {useEffect, useState} from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    List,
    ListItem,
    ListItemPrefix
} from "@material-tailwind/react";
import {
    PhotoIcon,
    IdentificationIcon,
    LockClosedIcon,
    TrashIcon
} from "@heroicons/react/24/solid";
import {getAuth} from "firebase/auth";

const Profile = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [memberSince, setMemberSince] = useState(null)
    const auth = getAuth();

    useEffect(() => {
        const fetchProfilePic = async () => {
            const picUrl = auth.currentUser ? auth.currentUser.photoURL : null;
            setProfilePic(picUrl);
        };

        const calculateMemberSince = () => {
            const creationTime = auth.currentUser.metadata.creationTime;
            const memberSinceDate = new Date(creationTime);
            const memberSinceDateString = memberSinceDate.toLocaleDateString('en-UK', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            setMemberSince(memberSinceDateString);
        }

        fetchProfilePic();
        calculateMemberSince();
    }, [auth.currentUser]);

    return (
        <div className="flex justify-center">
            <Card className="max-w-2xl rounded-lg overflow-hidden">
                <CardHeader floated={false}>
                    <div className="custom-gradient text-white py-8 px-4 text-center">
                        {profilePic && (
                            <img
                                src={profilePic}
                                alt="Profile Pic"
                                className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md"
                            />
                        )}

                        <Typography className="text-2xl font-bold mb-2">
                            {auth.currentUser.displayName}
                        </Typography>

                        <Typography className={"italic"}>
                            Member since {memberSince}
                        </Typography>
                    </div>
                </CardHeader>

                <CardBody className="bg-white py-6 px-4 text-center">
                    <Typography className="text-lg text-gray-700">
                        Update your profile with the below options
                    </Typography>

                    <List>
                        <ListItem disabled={true}>
                            <ListItemPrefix>
                                <IdentificationIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            Update Profile Name
                        </ListItem>

                        <ListItem disabled={true}>
                            <ListItemPrefix>
                                <PhotoIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            Update Profile Pic
                        </ListItem>

                        <ListItem disabled={true}>
                            <ListItemPrefix>
                                <LockClosedIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            Reset Password
                        </ListItem>

                        <ListItem className={"bg-red-700 text-white"}>
                            <ListItemPrefix disabled={true}>
                                <TrashIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            Delete Account
                        </ListItem>
                    </List>
                </CardBody>
            </Card>
        </div>
    )
};

export default Profile;
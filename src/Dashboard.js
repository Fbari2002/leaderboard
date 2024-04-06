import React, {useEffect, useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import AddButton from "./AddButton";
import ViewButton from "./ViewButton";

function Dashboard({user}) {
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        const fetchProfilePic = async () => {
            const picUrl = user ? user.photoURL : null;
            setProfilePic(picUrl);
        };

        fetchProfilePic();
    }, [user]);

    return (
        <div className="container mx-auto mt-4 flex flex-col items-center">
            <Card className="max-w-2xl rounded-lg overflow-hidden">
                <div className="custom-gradient text-white py-8 px-4 text-center">
                    {profilePic && (
                        <img
                            src={profilePic}
                            alt="Profile Pic"
                            className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md"
                        />
                    )}

                    <Typography className="text-2xl font-bold mb-2">
                        Welcome Back, {user.displayName}!
                    </Typography>
                </div>
                <CardBody className="bg-white py-6 px-4 text-center">
                    <Typography className="text-lg text-gray-700">
                        Explore the latest features and personalized content waiting for you. We're glad to have you
                        back!
                    </Typography>
                </CardBody>
            </Card>

            <div className="mt-4 flex flex-col items-center">
                <AddButton/>
                <ViewButton/>
            </div>
        </div>
    );
}

export default Dashboard;

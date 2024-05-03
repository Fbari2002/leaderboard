import React, {useEffect, useState} from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    List,
    ListItem,
    ListItemPrefix, Input,
} from "@material-tailwind/react";
import {
    PhotoIcon,
    IdentificationIcon,
    LockClosedIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import {updateProfile} from "firebase/auth";
import {Button, Dialog} from "@material-tailwind/react";
import {useUserContext} from "./userContext";

const Profile = () => {
    const user = useUserContext();
    const [memberSince, setMemberSince] = useState(null);
    const [userType, setUserType] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const calculateMemberSince = () => {
            const creationTime = user.metadata.creationTime;
            const memberSinceDate = new Date(creationTime);
            const memberSinceDateString = memberSinceDate.toLocaleDateString(
                "en-UK",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }
            );

            const getUserType = () => {
                const providerData = user.providerData;
                if (providerData && providerData.length > 0) {
                    const provider = providerData[0].providerId;
                    if (provider === "google.com") {
                        return "Google";
                    } else if (provider === "password") {
                        return "Email/Password";
                    } else {
                        return "Unknown";
                    }
                } else {
                    return "Unknown";
                }
            };

            setMemberSince(memberSinceDateString);
            setUserType(getUserType());
            setDisplayName(user.displayName || "");
        };

        calculateMemberSince();
    }, [user]);


    const handleChangeName = async () => {
        try {
            await updateProfile(user, {displayName: displayName});
            console.log("Display name updated successfully!");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating display name:", error.message);
        }
    };

    return (
        <div className="flex justify-center">
            <Card className="max-w-2xl rounded-lg overflow-hidden">
                <CardHeader floated={false}>
                    <div className="custom-gradient text-white py-8 px-4 text-center">
                        {user.photoURL && (
                            <img
                                src={user.photoURL}
                                alt="Profile Pic"
                                className="w-24 h-24 rounded-full mx-auto mb-4 shadow-md"
                            />
                        )}

                        <Typography className="text-2xl font-bold mb-2">
                            {user.displayName}
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
                        <ListItem
                            disabled={userType === "Google"}
                            onClick={() => setIsModalOpen(true)}
                        >
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

                        <ListItem
                            disabled={true}
                            className={"bg-red-700 text-white"}
                        >
                            <ListItemPrefix>
                                <TrashIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            Delete Account
                        </ListItem>
                    </List>
                </CardBody>
            </Card>

            <Dialog
                size="sm"
                open={isModalOpen}
                handler={handleChangeName}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            Enter your new profile name
                        </Typography>
                        <Input
                            label="Profile Name"
                            size="lg"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />

                        <div className={"flex flex-row gap-4"}>
                            <Button
                                variant="gradient"
                                onClick={() => setIsModalOpen(false)}
                                fullWidth
                                color={"red"}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="gradient"
                                onClick={handleChangeName}
                                fullWidth
                            >
                                Update
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </Dialog>
        </div>
    );
};

export default Profile;

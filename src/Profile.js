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
    TrashIcon
} from "@heroicons/react/24/solid";
import {
    updateProfile,
    sendPasswordResetEmail,
    deleteUser
} from "firebase/auth";
import {
    Button,
    Dialog
} from "@material-tailwind/react";
import sweetAlert from "sweetalert";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {collection, deleteDoc, query, where, getDocs} from "firebase/firestore";
import {db} from "./firebaseConfig";
import {useNavigate} from "react-router-dom";
import {useUserContext} from "./userContext";

const Profile = () => {
    const user = useUserContext();
    const [profilePic, setProfilePic] = useState(null);
    const [memberSince, setMemberSince] = useState(null);
    const [userType, setUserType] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [isNameChangeModelOpen, setIsNameChangeModelOpen] = useState(false);
    const [isPicModelOpen, setIsPicModelOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfilePic = async () => {
            const picUrl = user ? user.photoURL : null;
            setProfilePic(picUrl);
        };

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

        fetchProfilePic();
        calculateMemberSince();
    }, [user]);


    const handleChangeName = async () => {
        try {
            await updateProfile(user, {displayName: displayName});
            console.log("Display name updated successfully!");
            setIsNameChangeModelOpen(false);
        } catch (error) {
            console.error("Error updating display name:", error.message);
        }
    };

    const handlePasswordReset = () => {
        sendPasswordResetEmail(user, user.email)
            .then(() => {
                sweetAlert("Almost there", "A password reset email has been sent", "success");
            })
            .catch((error) => {
                sweetAlert("Oops!", "Something went wrong!\n" + error, "error");
            });
    }

    const handlePicChange = async () => {
        await updateProfile(user, {
            photoURL: profilePic,
        });

        setIsPicModelOpen(false);
    }

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const storage = getStorage();
            const storageRef = ref(storage, 'profile_pics/' + user.uid);
            await uploadBytes(storageRef, file);
            const photoURL = await getDownloadURL(storageRef);
            setProfilePic(photoURL);
        }
    };

    const handleAccountDelete = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this account and all associated data?");
        if (confirmation) {
            const q = query(collection(db, "leaderboards"), where("userID", "==", user.email));

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(async (doc) => {
                try {
                    await deleteDoc(doc.ref);
                    console.log("Document successfully deleted!");
                } catch (error) {
                    console.error("Error deleting document: ", error);
                }
            });

            deleteUser(user).then(() => {
                sweetAlert("Gone but not forgotten", "Sad to see you go but your account has been deleted", "success");
                navigate("/");
            }).catch((error) => {
                sweetAlert("Oops!", "Something went wrong!\n" + error, "error");
            });
        }
    }

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
                            onClick={() => setIsNameChangeModelOpen(true)}
                        >
                            <ListItemPrefix>
                                <IdentificationIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            Update Profile Name
                        </ListItem>

                        <ListItem
                            disabled={userType === "Google"}
                            onClick={() => setIsPicModelOpen(true)}
                        >
                            <ListItemPrefix>
                                <PhotoIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            Update Profile Pic
                        </ListItem>

                        <ListItem
                            disabled={userType === "Google"}
                            onClick={handlePasswordReset}
                        >
                            <ListItemPrefix>
                                <LockClosedIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            Reset Password
                        </ListItem>

                        <ListItem
                            className={"bg-red-700 text-white"}
                            onClick={handleAccountDelete}
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
                open={isNameChangeModelOpen}
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
                                onClick={() => setIsNameChangeModelOpen(false)}
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


            <Dialog
                size="sm"
                open={isPicModelOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                        <Typography
                            className="mb-3 font-normal"
                            variant="paragraph"
                            color="gray"
                        >
                            Upload your new profile picture
                        </Typography>

                        <Input
                            label={"Profile Picture"}
                            type="file"
                            size="lg"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        <div className={"flex flex-row gap-4"}>
                            <Button
                                variant="gradient"
                                onClick={() => setIsPicModelOpen(false)}
                                fullWidth
                                color={"red"}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="gradient"
                                onClick={handlePicChange}
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

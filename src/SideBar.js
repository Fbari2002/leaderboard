import React, {useState} from "react";
import {
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Drawer,
    Card,
} from "@material-tailwind/react";
import {
    UserCircleIcon,
    Cog6ToothIcon,
    HomeIcon,
    PlusIcon,
    EyeIcon,
    ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/solid";
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {NavLink, useNavigate} from 'react-router-dom';
import {signOut} from "firebase/auth";
import {getAuth} from 'firebase/auth';
import sweetAlert from "sweetalert";

export function SideBar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);
    const auth = getAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate('/')
            })
            .catch((error) => {
                sweetAlert("Oops!", "Something went wrong!\n" + error, "error");
            });
    }

    return (
        <>
            <IconButton variant="text" size="lg" onClick={openDrawer}>
                {isDrawerOpen ? (
                    <XMarkIcon className="h-8 w-8 stroke-2"/>
                ) : (
                    <Bars3Icon className="h-8 w-8 stroke-2"/>
                )}
            </IconButton>
            <Drawer open={isDrawerOpen} onClose={closeDrawer}>
                <Card
                    color="transparent"
                    shadow={false}
                    className="h-[calc(100vh-2rem)] w-full p-4"
                >
                    <div className="mb-2 flex items-center gap-4 p-4">
                        <img
                            src={process.env.PUBLIC_URL + '/Logo.png'}
                            alt="brand"
                            className="h-10 w-10"
                        />
                        <Typography variant="h5" color="blue-gray">
                            BattleBoards
                        </Typography>
                    </div>
                    <List>
                        <NavLink exact="true" to="/dashboard">
                            <ListItem>
                                <ListItemPrefix>
                                    <HomeIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                Dashboard
                            </ListItem>
                        </NavLink>

                        <NavLink exact="true" to="/createLeaderboard">
                            <ListItem>
                                <ListItemPrefix>
                                    <PlusIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                Create Leaderboard
                            </ListItem>
                        </NavLink>

                        <NavLink exact="true" to="/viewBoard">
                            <ListItem>
                                <ListItemPrefix>
                                    <EyeIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                View Leaderboard
                            </ListItem>
                        </NavLink>

                        <hr className="my-2 border-blue-gray-50"/>

                        <NavLink exact="true" to="/profile">
                            <ListItem>
                                <ListItemPrefix>
                                    <UserCircleIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                Profile
                            </ListItem>
                        </NavLink>

                        <ListItem disabled={true}>
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            Settings
                        </ListItem>

                        <ListItem
                            onClick={handleSignOut}
                        >
                            <ListItemPrefix>
                                <ArrowLeftStartOnRectangleIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </List>
                </Card>
            </Drawer>
        </>
    );
}


export default SideBar;
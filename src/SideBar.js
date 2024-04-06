import React from "react";
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
    PowerIcon,
    HomeIcon,
    PlusIcon,
    EyeIcon
} from "@heroicons/react/24/solid";
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {NavLink} from 'react-router-dom';


export function SidebarWithBurgerMenu() {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

    const openDrawer = () => setIsDrawerOpen(true);
    const closeDrawer = () => setIsDrawerOpen(false);

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
                        {/*TODO Update logo*/}
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
                        <NavLink exact to="/leaderboard/dashboard">
                            <ListItem>
                                <ListItemPrefix>
                                    <HomeIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                Dashboard
                            </ListItem>
                        </NavLink>

                        <NavLink exact to="/leaderboard/createLeaderboard">
                            <ListItem>
                                <ListItemPrefix>
                                    <PlusIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                Create Leaderboard
                            </ListItem>
                        </NavLink>

                        <NavLink exact to="/leaderboard/viewBoard" activeClassName="activeClicked">
                            <ListItem>
                                <ListItemPrefix>
                                    <EyeIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                View Leaderboard
                            </ListItem>
                        </NavLink>

                        <hr className="my-2 border-blue-gray-50"/>

                        <ListItem>
                            <ListItemPrefix>
                                <UserCircleIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            Profile
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <Cog6ToothIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            Settings
                        </ListItem>
                        <ListItem>
                            <ListItemPrefix>
                                <PowerIcon className="h-5 w-5"/>
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </List>
                </Card>
            </Drawer>
        </>
    );
}

export default SidebarWithBurgerMenu;
import React from "react";
import {Button, Card, CardBody, CardHeader, Typography, CardFooter, Tooltip} from "@material-tailwind/react";
import {
    UserPlusIcon,
    DocumentPlusIcon,
    ChartBarIcon,
} from "@heroicons/react/24/solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLinkedinIn} from "@fortawesome/free-brands-svg-icons";
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <div className="bg-warmGray-200 min-h-screen">
            {/* Navigation Bar */}
            <nav className="bg-purple-800 py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">BattleBoards</h1>
                </div>
                <div>
                    <Button
                        onClick={handleLogin}
                        variant="gradient"
                        color={"white"}
                        className="mr-2 text-purple-800"
                    >
                        Login
                    </Button>
                    <Button
                        onClick={handleRegister}
                        variant="gradient"
                        color={"white"}
                        className="text-purple-800"
                    >
                        Register
                    </Button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="bg-purple-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-extrabold text-white">
                    Welcome to BattleBoards
                </h1>
                <p className="mt-4 text-lg text-purple-200">
                    Create, Update, and View your own leaderboards!
                </p>
                <Button
                    onClick={handleLogin}
                    variant={"gradient"}
                    color={"white"}
                    className="mt-8 inline-block w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-800"
                >
                    Get Started
                </Button>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-purple-800">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div
                        className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center">
                        <UserPlusIcon className="h-10 w-10 text-purple-800 mb-4"/>
                        <h3 className="text-xl text-center font-bold mb-4 text-purple-800">
                            Step 1: Sign Up for Battleboards
                        </h3>
                        <p className="text-gray-700 text-center">
                            Create a free account to get started. It only takes a minute.
                        </p>
                    </div>
                    <div
                        className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center"
                    >
                        <DocumentPlusIcon className="h-10 w-10 text-purple-800 mb-4"/>
                        <h3 className="text-xl text-center font-bold mb-4 text-purple-800">
                            Step 2: Create Your Custom Leaderboard
                        </h3>
                        <p className="text-gray-700 text-center">
                            Choose a name for your board, add the players, and customize your leaderboard
                            to fit your needs. Whether it's tracking students' progress or
                            ranking restaurants, Battleboards offers flexibility.
                        </p>
                    </div>
                    <div
                        className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center">
                        <ChartBarIcon className="h-10 w-10 text-purple-800 mb-4"/>
                        <h3 className="text-xl text-center font-bold mb-4 text-purple-800">
                            Step 3: Stay Organized and Informed
                        </h3>
                        <p className="text-gray-700 text-center">
                            Stay organized with your personalized dashboard. Battleboards makes it easy to
                            track and manage your data.
                        </p>
                    </div>
                </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="bg-purple-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                    Join Battleboards Today
                </h2>
                <Button
                    onClick={handleRegister}
                    variant={"gradient"}
                    color={"white"}
                    className="mt-8 inline-block w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-800"
                >
                    Sign Up Now
                </Button>
            </div>

            {/* About Us Section */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-purple-800">
                    About Battleboards
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                    BattleBoards is a versatile platform dedicated to providing customizable leaderboard solutions. Our
                    mission is to offer an intuitive and flexible tool for tracking and ranking various metrics.
                    BattleBoards is designed to create and utilize leaderboards across a wide range of applications.
                </p>
                <h3 className="text-2xl font-bold text-center text-purple-800 mb-4">
                    Meet the Team
                </h3>
                <p className="text-lg text-gray-700 text-center">
                    Our team consists of passionate developers dedicated to creating
                    innovative solutions for community organization and engagement.
                </p>

                <div className="mt-8 flex items-center justify-center">
                    <Card className="w-96">
                        <CardHeader className="h-80">
                            <img
                                src="https://media.licdn.com/dms/image/D4E03AQGg2QkMGp1NsA/profile-displayphoto-shrink_200_200/0/1706303089663?e=1720656000&v=beta&t=jn1c-mGOtXdbRiBd1t8w_1HCd9nBEnDc6ALGv8a_yNI"
                                alt="Profile Picture"
                                className="w-full h-full object-cover"
                            />
                        </CardHeader>

                        <CardBody className="text-center">
                            <Typography variant="h4" color="blue-gray" className="mb-2">
                                Fatima Bari
                            </Typography>
                            <Typography color="blue-gray" className="font-medium" textGradient>
                                Developer
                            </Typography>
                        </CardBody>

                        <CardFooter className="flex justify-center gap-7 pt-2">
                            <Tooltip content="Connect on LinkedIn">
                                <a
                                    href="https://www.linkedin.com/in/fatima-i-bari"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faLinkedinIn}/>
                                </a>
                            </Tooltip>
                        </CardFooter>
                    </Card>
                </div>

            </div>

            {/* Contact Us Section */}
            <div className="bg-purple-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
                <p className="text-lg text-purple-200 mb-8">
                    Have questions or feedback? We'd love to hear from you! <br/>Contact us at{" "}
                    <a href="mailto:barifatima2002@gmail.com" className="underline">
                        contact@battleboards.com
                    </a>
                </p>
            </div>

            <footer className="bg-purple-800 py-8 px-4 sm:px-6 lg:px-8 text-white text-center">
                <p className="mt-4">© 2024 Battleboards. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;

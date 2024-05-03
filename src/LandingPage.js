import React from "react";
import {Button} from "@material-tailwind/react";
import {AcademicCapIcon, ArrowPathIcon, ChartBarIcon} from "@heroicons/react/24/solid";

const LandingPage = () => {
    return (
        <div className="bg-white">
            {/* Navigation Bar */}
            <nav className="bg-purple-800 py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">BattleBoards</h1>
                </div>
                <div>
                    <a href="/login" className="text-white hover:underline mr-4">Login</a>
                    <a href="/signup" className="text-white hover:underline">Register</a>
                </div>
            </nav>

            {/* Main Content */}
            <div className="bg-purple-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-extrabold text-white">Welcome to BattleBoards</h1>
                <p className="mt-4 text-lg text-purple-200">Create, Update, and View your own leaderboards!</p>
                <Button
                    className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-800 bg-white hover:bg-purple-50">
                    Get Started
                </Button>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-purple-800">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div
                        className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center">
                        <AcademicCapIcon className="h-10 w-10 text-purple-800 mb-4"/>
                        <h3 className="text-xl font-bold mb-4 text-purple-800">Step 1: Sign Up for Battleboards</h3>
                        <p className="text-gray-700 text-center">Create a free account to get started. It only takes a
                            minute.</p>
                    </div>
                    <div
                        className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center">
                        <ArrowPathIcon className="h-10 w-10 text-purple-800 mb-4"/>
                        <h3 className="text-xl font-bold mb-4 text-purple-800">Step 2: Create Your Custom
                            Leaderboard</h3>
                        <p className="text-gray-700 text-center">Choose a category, set scoring rules, and customize
                            your leaderboard to fit your needs. Whether it's tracking students' progress or ranking
                            restaurants, Battleboards offers flexibility.</p>
                    </div>
                    <div
                        className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center">
                        <ChartBarIcon className="h-10 w-10 text-purple-800 mb-4"/>
                        <h3 className="text-xl font-bold mb-4 text-purple-800">Step 3: Stay Organized and Informed</h3>
                        <p className="text-gray-700 text-center">Stay organized with your personalized dashboard and
                            receive notifications for important updates. Battleboards makes it easy to track and manage
                            your data.</p>
                    </div>
                </div>
            </div>

            {/* Call-to-Action Section */}
            <div className="bg-purple-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Join Battleboards Today</h2>
                <Button
                    className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-800 bg-white hover:bg-purple-50">
                    Sign Up Now
                </Button>
            </div>

            {/* About Us Section */}
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-purple-800">About Battleboards</h2>
                <p className="text-lg text-gray-700 mb-8">Battleboards is a versatile platform designed to empower
                    communities with custom leaderboards. Our mission is to provide an intuitive and flexible solution
                    for tracking and ranking anything you want.</p>
                <h3 className="text-2xl font-bold text-purple-800 mb-4">Meet the Team</h3>
                <p className="text-lg text-gray-700">Our team consists of passionate developers dedicated to creating
                    innovative solutions for community organization and engagement.</p>
            </div>

            {/* Contact Us Section */}
            <div className="bg-purple-800 py-12 px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
                <p className="text-lg text-purple-200 mb-8">Have questions or feedback? We'd love to hear from you!
                    Contact us at <a href="mailto:contact@battleboards.com"
                                     className="underline">contact@battleboards.com</a></p>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="text-white hover:text-purple-200"><i
                        className="fab fa-facebook fa-2x"></i></a>
                    <a href="#" className="text-white hover:text-purple-200"><i
                        className="fab fa-twitter fa-2x"></i></a>
                    <a href="#" className="text-white hover:text-purple-200"><i className="fab fa-instagram fa-2x"></i></a>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-purple-800 py-8 px-4 sm:px-6 lg:px-8 text-white text-center">
                <nav className="flex justify-center space-x-4 mb-4">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="#" className="hover:underline">About Us</a>
                    <a href="#" className="hover:underline">Contact Us</a>
                </nav>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="text-white hover:text-purple-200"><i
                        className="fab fa-facebook fa-lg"></i></a>
                    <a href="#" className="text-white hover:text-purple-200"><i
                        className="fab fa-twitter fa-lg"></i></a>
                    <a href="#" className="text-white hover:text-purple-200"><i className="fab fa-instagram fa-lg"></i></a>
                </div>
                <p className="mt-4">© 2024 Battleboards. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;

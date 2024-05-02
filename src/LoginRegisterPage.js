import React, {useState} from 'react';
import {signInWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {auth, signInWithGooglePopup} from "./firebaseConfig";
import sweetAlert from 'sweetalert';
import ModalButton from "./resetPasswordModal";
import {Button} from "@material-tailwind/react";

const LoginRegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/leaderboard/dashboard");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                sweetAlert("Oops!", "Something went wrong!\n" + errorMessage, "error");
            });
    }

    const logGoogleUser = async () => {
        await signInWithGooglePopup();
        navigate("/leaderboard/dashboard");
    }

    return (
        <section className="custom-gradient min-h-screen flex justify-center items-center">
            <div className="container mx-auto p-5">
                <div className="max-w-md w-full mx-auto bg-gray-900 rounded-lg p-8">
                    <h2 className="text-white font-bold text-3xl mb-4 text-center">Login</h2>
                    <p className="text-white text-center mb-6">Please enter your email and password</p>
                    <div className="mb-4">
                        <input
                            className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="email-address"
                            name="email"
                            type="email"
                            required
                            placeholder="Email address"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-6 flex flex-col gap-4">
                        <Button
                            color="white"
                            className="px-4 py-2"
                            onClick={onLogin}
                            gradient={"true"}
                            ripple={true}
                        >
                            Login
                        </Button>
                        <Button
                            color="white"
                            onClick={logGoogleUser}
                            className="flex items-center justify-center gap-2"
                        >
                            <img
                                src="https://docs.material-tailwind.com/icons/google.svg"
                                alt="Google Logo"
                                className="h-4 w-4"
                            />
                            <span>Continue with Google</span>
                        </Button>

                        <ModalButton/>
                    </div>
                    <p className="text-white text-center mb-0">Don't have an account?
                        <Link to="/signup" className="text-blue-500 font-bold">
                            <br/>Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LoginRegisterPage;

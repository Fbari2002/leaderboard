import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from './firebaseConfig';
import errorAlert from 'sweetalert';
import PasswordStrengthBar from 'react-password-strength-bar';
import {Button} from "@material-tailwind/react";

const SignUpPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const validate = () => {
        return password.length >= 6 && email !== '';
    };

    const onSignUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                //TODO should this re route to complete Profile?
                navigate('/leaderboard/dashboard');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                errorAlert("Oops!", "Registration failed! Please try again\n" + errorMessage, "error");
            });
    };

    return (
        <section className="custom-gradient min-h-screen flex justify-center items-center">
            <div className="container mx-auto p-5">
                <div className="max-w-md w-full mx-auto bg-gray-900 rounded-lg p-8">
                    <h2 className="text-white font-bold text-3xl mb-4 text-center">Sign Up</h2>
                    <p className="text-white text-center mb-6">Create a new account</p>
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
                        <div className="password-input-container">
                            <input
                                className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <PasswordStrengthBar password={password}/>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            disabled={!validate()}
                            onClick={onSignUp}
                            color={"white"}
                            gradient={true}
                            ripple={true}
                        >
                            Sign Up
                        </Button>
                    </div>
                    <div className="mt-4">
                        <p className="text-white text-center mb-0">Already have an account?
                            <Link to="/leaderboard" className="text-blue-500 font-bold">
                                <br/> Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUpPage;

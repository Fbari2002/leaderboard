import React, { useState } from 'react';
import './index.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGooglePopup } from "./firebaseConfig";
import sweetAlert from 'sweetalert';
import ModalButton from "./resetPasswordModal";

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
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white rounded-1rem">
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-4">
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-4">Please enter your email and password</p>
                                    <div className="form-outline form-white mb-3">
                                        <input
                                            className="form-control form-control-lg"
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="Email address"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-outline form-white mb-3">
                                        <input
                                            className="form-control form-control-lg"
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <button className="btn btn-outline-light btn-lg px-4" type="submit" onClick={onLogin}>
                                            Login
                                        </button>

                                        <button type="button" onClick={logGoogleUser} className="login-with-google-btn px-8">
                                            Login with Google
                                        </button>
                                    </div>

                                    <div>
                                        <ModalButton/>
                                    </div>
                                </div>

                                <div>
                                    <p className="mb-0">Don't have an account? <Link to="/leaderboard/signup" className="text-info fw-bold">Sign Up</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default LoginRegisterPage;

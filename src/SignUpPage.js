import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import errorAlert from 'sweetalert';
import PasswordStrengthBar from 'react-password-strength-bar';

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
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white rounded-1rem">
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                                    <p className="text-white-50 mb-5">Create a new account</p>
                                    <div className="form-outline form-white mb-4">
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
                                    <div className="form-outline form-white mb-4">
                                        <div className="password-input-container">
                                            <input
                                                className="form-control form-control-lg password-input"
                                                id="password"
                                                name="password"
                                                type="password"
                                                required
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <PasswordStrengthBar password={password} />
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-outline-light btn-lg px-5"
                                        type="submit"
                                        disabled={!validate()}
                                        onClick={onSignUp}
                                        title={!validate() ? 'Password must be at least 6 characters long and email cannot be blank.' : ''}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                <div>
                                    <p className="mb-0">Already have an account? <Link to="/leaderboard" className="text-info fw-bold">Login</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUpPage;

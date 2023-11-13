import React, {useState} from 'react';
import './index.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {auth} from "./firebaseConfig";

const LoginRegisterPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/dashboard")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage)
                alert('wrong')
            });

    }

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white rounded-1rem">
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your login and password</p>
                                    <div className="form-outline form-white mb-4">
                                        <input
                                            className="form-control form-control-lg"
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="Email address"
                                            onChange={(e)=>setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-outline form-white mb-4">
                                        <input
                                            className="form-control form-control-lg"
                                            id="password"
                                            name="password"
                                            type="password"
                                            required
                                            placeholder="Password"
                                            onChange={(e)=>setPassword(e.target.value)}
                                        />
                                    </div>
                                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                                    <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick={onLogin}>Login</button>
                                </div>
                                <div>
                                    <p className="mb-0">Don't have an account? <a href="/signup" className="text-white-50 fw-bold">Sign Up</a></p>
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

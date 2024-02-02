import React, { useState, useEffect } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import errorAlert from 'sweetalert';

const CompleteProfile = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.displayName) {
                navigate('/leaderboard/dashboard');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const validateForm = () => {
        return firstName.trim() !== '' && lastName.trim() !== '';
    };

    const onProfileUpdate = async (photoURL) => {
        const auth = getAuth();

        try {
            // Update profile with display name and photoURL
            await updateProfile(auth.currentUser, {
                displayName: firstName + ' ' + lastName,
                photoURL: photoURL,
            });

            navigate('/leaderboard/dashboard');
        } catch (error) {
            console.error('Error updating profile:', error);
            errorAlert('Oops!', 'Registration failed! Please try again\n' + error, 'error');
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const auth = getAuth();

        if (file) {
            // Upload profile picture to storage
            const storage = getStorage();
            const storageRef = ref(storage, 'profile_pics/' + auth.currentUser.uid);
            await uploadBytes(storageRef, file);

            // Get the download URL and set it in the state
            const photoURL = await getDownloadURL(storageRef);
            setProfilePic(photoURL);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            if (profilePic) {
                await onProfileUpdate(profilePic);
            }
        } else {
            // Handle the case when the form is not valid
            console.error('Form validation failed');
            // You can display an error message or take other actions
            errorAlert('Nice try!', 'You must provide a full name', 'error');
        }
    };

    return (
        <>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white rounded-1rem">
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-4">
                                        <h2 className="fw-bold mb-2 text-uppercase">Complete Profile</h2>
                                        <p className="text-white-50 mb-4">
                                            Please enter your name and upload a profile picture
                                        </p>

                                        <Form onSubmit={handleSubmit}>
                                            <FloatingLabel controlId="first-name" label="First Name *" className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    required
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </FloatingLabel>

                                            <div className="my-3"></div>

                                            <FloatingLabel controlId="last-name" label="Last Name *" className="mb-3">
                                                <Form.Control
                                                    type="text"
                                                    required
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </FloatingLabel>

                                            <div className="my-3">
                                                <Form.Control
                                                    type="file"
                                                    id="profile-pic"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </div>

                                            <div className="d-flex justify-content-center my-4">
                                                <Button variant="outline-light" size="lg" type="submit">
                                                    Update
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CompleteProfile;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import errorAlert from 'sweetalert';
import { Button } from '@material-tailwind/react';

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
        const auth = await getAuth();

        try {
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
            const storage = getStorage();
            const storageRef = ref(storage, 'profile_pics/' + auth.currentUser.uid);
            await uploadBytes(storageRef, file);
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
            console.error('Form validation failed');
            errorAlert('Nice try!', 'You must provide a full name', 'error');
        }
    };

    return (
        <section className="custom-gradient min-h-screen flex justify-center items-center">
            <div className="max-w-md w-full mx-auto bg-gray-900 rounded-lg p-8">
                <h2 className="text-white font-bold text-3xl mb-4 text-center">Complete Profile</h2>
                <p className="text-white text-center mb-4">Please enter your name and upload a profile picture</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="First Name"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            placeholder="Last Name"
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            className="w-full px-3 py-2 bg-gray-800 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="file"
                            id="profile-pic"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="flex justify-center">
                        <Button
                            color="white"
                            type="submit"
                            gradient={"true"}
                            ripple={true}
                            disabled={!validateForm()}
                        >
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default CompleteProfile;

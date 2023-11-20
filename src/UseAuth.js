// Adapted from: https://blog.logrocket.com/integrating-firebase-authentication-expo-mobile-app/#creating-an-authentication-hook

import {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const auth = getAuth();

export function useAuthentication() {
    const [user, setUser] = useState();

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
    }, []);

    return {
        user
    };
}
// Adapted from: https://blog.logrocket.com/integrating-firebase-authentication-expo-mobile-app/#creating-an-authentication-hook

import React from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const auth = getAuth();

export function useAuthentication() {
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(undefined);
            }
        });

        return unsubscribeFromAuthStateChanged;
    }, []);

    return {
        user
    };
}
import React, { createContext, useEffect, useState } from 'react'
import app from '../../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'

export const AuthContext = createContext();
const auth = getAuth(app);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);

    // create user with email and pass
    const createUser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    }
    // login
    const signIn = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass);
    }
    // update user profile
    const updateUserProfile = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }
    // log out
    const logOut = () => {
        return signOut(auth);
    }

    // onAuth state changed
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser || currentUser === null) {
                setLoading(false);
                setUser(currentUser);
            }
        })
        return () => unsubscribe();
    }, [])

    const authInfo = { user, loading, createUser, signIn, logOut, updateUserProfile }
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

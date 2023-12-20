import React from 'react';
import { auth } from '../../firebase-config/FirebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const SignIn = () => {

    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.log(error);
        }
    };

    const signOut = () => {
        if (auth.currentUser) {
            return (
                <button onClick={() => {
                    auth.signOut();
                }}>Sign out</button>
            );
        }
        return null;
    };

    return (
        <div>
            <button onClick={signInWithGoogle}>Sign in with Google</button>
            {signOut()}
        </div>
    );
};

export default SignIn;

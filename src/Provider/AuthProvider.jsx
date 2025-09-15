import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import auth from '../FireBase/FireBase.config'
import useAxiosPublic from '../Hooks/AxiosPublic/useAxiosPublic'

export const AuthContext = createContext(null)
// google provider
const provider = new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
    const axiosPublic=useAxiosPublic()

    const [user, setuser] = useState()
    const [loader, setLoader] = useState(true)
    // handle Sign In
    const handleSignIn = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    // handle Sign Up
    const handleSignUp = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    // handle Google Sign In
    const handleGoogleSignIn = () => {
        setLoader(true)
        return signInWithPopup(auth, provider)
    }
    //handle sign out
    const handleSignOut = () => {
        return signOut(auth);
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setuser(currentUser)
            // setLoader(false)
            console.log(currentUser)
            const userInFo={
                email:currentUser?.email
            }
            if (currentUser) {
                axiosPublic.post('/jwt',userInFo)
                .then(res=>{
                    // console.log(res.data)
                    if (res.data.token) {
                        localStorage.setItem('access-token',res.data.token)                    
                        setLoader(false)
                    }
                })
            } else{
                localStorage.removeItem('access-token')
            }
            console.log(currentUser)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const AuthInFo = {
        handleSignIn,
        handleSignUp,
        handleGoogleSignIn,
        handleSignOut,
        user,
        loader

    }
    return <AuthContext.Provider value={AuthInFo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;
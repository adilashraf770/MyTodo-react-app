import { auth } from 'config/Firebase'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, createContext, useReducer } from 'react'

export const AuthContext = createContext()

const initialState = { isAuthenticated: false }
const reducer = ((state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { isAuthenticated: true, user: action.payload.user }
        case "LOGOUT":
            return { isAuthenticated: false }
        default:
            return state
    }
})
export default function AuthContextProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                dispatch({ type: "LOGIN", payload: { user } })
                // console.log(user)
                // console.log("User is Logged In")
                // window.notify("User is Logged In", "success")
                // ...
            } else {
                // User is signed out
                console.log("User is  Logged Out")
                // window.notify("User is Logged Out", "success")
                // ...
            }
        });
    }, [])
    return (
        <>
            <AuthContext.Provider value={{ authstate: state, dispatch }}>
                {props.children}
            </AuthContext.Provider>
        </>
    )
}

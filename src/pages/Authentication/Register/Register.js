import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { auth, firestore } from '../../../config/Firebase';
import { AuthContext } from 'context/AuthContext';

const initialState = { email: "", password: "" }
export default function Register() {
    const [state, setstate] = useState(initialState);
    const [isPrpcessing, setIsPrpcessing] = useState(false);
    // const [user, setUser] = useState({});
    const { dispatch } = useContext(AuthContext)


    const handleChange = (e) => {
        setstate(s => ({ ...s, [e.target.name]: e.target.value }))
        // setIsPrpcessing(true);

    }

    const hangleRegister = (e) => {
        e.preventDefault();
        setIsPrpcessing(true);
        const { email, password } = state;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                addDocument(user);
                console.log(user)
                console.log("User is Created")

            })
            .catch((error) => {
                console.error(error)
                setIsPrpcessing(false)
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // ..
            })
    }

    const addDocument = async (user) => {
        try {
            // Add a new document in collection Users
            await setDoc(doc(firestore, "users", user.uid), {
                firstName: "Adil",
                lastName: "Ali",
                uid: user.uid,

            });
            window.notify("User document is Created in Firestore", "success")
            console.log("User document is Created in Firestore")
            dispatch({ type: "LOGIN" })

        }
        catch (error) {
            console.error(error)
        }
        setIsPrpcessing(false)

    };

    return (
        <div className='login'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="card p-5">
                            <form onSubmit={hangleRegister}>
                                <div className="row py-1 mb-2">
                                    <div className="col ">
                                        <h2 className='Login-title text-center '>Register </h2>
                                        <hr />
                                    </div>
                                </div>
                                <div className="row mb-4 ">
                                    <div className="col">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" className='form-control' id="email" placeholder='Email' onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" className='form-control' id="password" placeholder='Password' onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col text-center">
                                        <button className="btn btn-success w-75" disabled={isPrpcessing}>
                                            {!isPrpcessing ? "Register" : <div className="btn-success spinner-border"></div>}
                                        </button>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col">
                                        <p className="mb-0">Have An Account <Link to='/authentication/login' className='register'>Login</Link> </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

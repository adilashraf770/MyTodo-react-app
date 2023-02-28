import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../config/Firebase'


const initialState = { email: "", password: "" }
export default function Login() {
    const navigate = useNavigate()

    const [state, setstate] = useState(initialState);
    const [isPrpcessing, setIsPrpcessing] = useState(false);
    // const [user, setUser] = useState(initialState);

    const handleChange = (e) => {
        setstate(s => ({ ...s, [e.target.name]: e.target.value }))
    }


    const hangleLogin = (e) => {
        e.preventDefault();
        setIsPrpcessing(true);
        const { email, password } = state;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // setUser(user)
                console.log(user)
                // console.log("User is Logged In")


                navigate("/dashboard")
            })
            .catch((error) => {
                console.log(error)
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // ..
                setIsPrpcessing(false);
            })

    }
    return (
        <div className='login'>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="card p-5">
                            <form onSubmit={hangleLogin}>
                                <div className="row py-1 mb-3">
                                    <div className="col ">
                                        <h2 className='Login-title text-center '>Login</h2>
                                        <hr />
                                    </div>
                                </div>
                                <div className="row mb-4 ">
                                    <div className="col">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" className='form-control' id="email" placeholder='Email' onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mb-1">
                                    <div className="col">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" className='form-control' id="password" placeholder='Password' onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col">
                                        <p className="mb-0"><Link to='/authentication/forget-password' className='forget'>Forget Password?</Link> </p>
                                    </div>
                                </div>
                                <div className="row ">
                                    <div className="col text-center">
                                        <button className="btn btn-success w-75" disabled={isPrpcessing}>
                                            {!isPrpcessing ? "Login" : <div className="btn-success spinner-border"></div>}
                                        </button>
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col">
                                        <p className="mb-0">Need An Account? <Link to='/authentication/register' className='register'>Register</Link> </p>
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

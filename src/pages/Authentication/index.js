import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import ForgetPassword from './ForgetPassword'

export default function index() {
    return (
        <>

            <Routes>
                <Route path='/'  >
                    <Route index element={<Login />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='forget-password' element={<ForgetPassword />} />
                </Route>
            </Routes>

        </>
    )
}

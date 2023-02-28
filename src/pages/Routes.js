import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Frontend from './Frontend';
import Authentication from './Authentication'
import Dashboard from './Dashboard'
import PrivateRoutes from 'componants/PrivateRoutes';
import { AuthContext } from 'context/AuthContext';

export default function Index() {
    const { authstate } = useContext(AuthContext);
    const { isAuthenticated } = authstate
    // console.log(user)
    return (
        <BrowserRouter>
            <Routes >
                <Route path='/*' element={<Frontend />} />
                <Route path='/authentication/*' element={!isAuthenticated ? <Authentication /> : <Navigate to='/dashboard' />} />
                <Route path='/dashboard/*' element={<PrivateRoutes Componant={Dashboard} />} />
            </Routes>
        </BrowserRouter >

    )
}

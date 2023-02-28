import { AuthContext } from 'context/AuthContext';
import Login from 'pages/Authentication/Register/Register';
import React, { useContext } from 'react'

export default function PrivateRoutes(props) {
    const { Componant } = props;

    const { authstate } = useContext(AuthContext)
    const { isAuthenticated } = authstate

    if (!isAuthenticated)
        return <Login />
    return (
        <Componant />

    )
}

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext';
import { auth } from 'config/Firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
    const { authstate, dispatch } = useContext(AuthContext);
    const { isAuthenticated } = authstate;

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: "LOGOUT" })
            })
            .catch(e => {
                console.error(e);
            })
        window.notify("Logged Out", 'info')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container">
                    <Link to="/home" className="navbar-brand" >Navbar</Link>
                    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link active" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/todos" className="nav-link" >Todos</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link to="/about" className="nav-link" >About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link ">Contact</Link>
                            </li> */}
                        </ul>
                        <div className="d-flex" >
                            {!isAuthenticated ? <Link to='authentication/login' className="btn btn-primary" >Login</Link>
                                : <>
                                    <Link to='dashboard' className="btn btn-primary  me-2" >Dashborad</Link>
                                    <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
    let location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#EAF5FE" }}>
                <div className="container-fluid ms-3">
                    <Link className="navbar-brand" to="/" style={{ color: "#5A5C5E" }}>{props.brand}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/yournotes" ? "active" : ""}`} aria-current="page" to="/yournotes">{props.yournotes}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/addnotes" ? "active" : ""}`} aria-current="page" to="/addnotes">{props.home}</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">{props.about}</Link>
                            </li>
                        </ul>
                        { !localStorage.getItem('token') ? 
                            <form className="d-flex">
                                <Link className="navbar-brand" to="/login" style={{ color: "#538ADA" }}>login</Link>
                                <Link className="navbar-brand" to="/signup" style={{ color: "#538ADA" }}>Signup</Link>
                            </form> 
                            : 
                            <button onClick={handleLogout} style={{ color: "#538ADA" }} className='btn btn-none fs-5' > Logout</button>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
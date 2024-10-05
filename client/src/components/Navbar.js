import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { HiOutlineLogin } from "react-icons/hi";
import { FaPersonRunning } from "react-icons/fa6";

const Navbar = (props) => {
    const [click, setClick] = useState(false);
    let location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    // Toggle the mobile menu and disable body scroll when open
    const handleClick = () => {
        setClick(!click);
        document.body.style.overflow = click ? 'auto' : 'hidden'; // Disable scroll on open, enable on close
    };

    return (
        <div className="relative">
            {/* Navbar wrapper */}
            <div className="bg-customBlue text-customWhite shadow-md w-full text-xl px-4 sm:px-6 lg:px-10">
                <div className="flex items-center justify-between py-4">
                    {/* Brand */}
                    <Link to="/" className="text-2xl font-semibold lg:text-3xl">
                        {props.brand}
                    </Link>

                    {/* Desktop Menu (Visible on lg screens and above) */}
                    <div className="hidden lg:flex items-center justify-end space-x-6">
                        <Link to="/yournotes" className={`hover:text-lightBlue px-4 py-2 rounded ${location.pathname === "/yournotes" ? "border-b-2 border-lightBlue" : "border-b-2 hover:border-lightBlue"}`}>
                            {props.yournotes}
                        </Link>
                        <Link to="/addnotes" className={`hover:text-lightBlue px-4 py-2 rounded ${location.pathname === "/addnotes" ? "border-b-2 border-lightBlue" : "border-b-2 hover:border-lightBlue"}`}>
                            {props.home}
                        </Link>
                        <Link to="/about" className={`hover:text-lightBlue px-4 py-2 rounded ${location.pathname === "/about" ? "border-b-2 border-lightBlue" : "border-b-2 hover:border-lightBlue"}`}>
                            {props.about}
                        </Link>
                    </div>

                    {/* Login/Signup or Logout */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {!localStorage.getItem('token') ? (
                            <Link to="/login" className="flex items-center gap-2 bg-lighterBlue text-customBlue border-none p-2 rounded-xl">
                                Login
                                <HiOutlineLogin />
                            </Link>
                        ) : (
                            <button onClick={handleLogout} className="flex items-center gap-2 bg-lighterBlue text-customBlue border-none p-2 rounded-xl">
                                Logout
                                <FaPersonRunning />
                            </button>
                        )}
                    </div>

                    {/* Hamburger Menu Icon (Visible on lg and below) */}
                    <button className="block lg:hidden z-50" onClick={handleClick}>
                        {click ? <FaTimes size={30} className="text-customWhite" /> : <CiMenuFries size={30} className="text-customWhite" />}
                    </button>
                </div>

                {/* Mobile Menu (Visible when hamburger icon is clicked) */}
                <div className={`lg:hidden z-10 fixed top-0 right-0 h-full w-full bg-lightBlue p-10 transition-transform duration-500 ease-in-out ${click ? 'translate-x-0' : 'translate-x-full'}`}>
                    <ul className="flex flex-col mt-20 items-center space-y-8 text-4xl text-customWhite">
                        <Link to="/yournotes" onClick={handleClick} className={`border-2 hover:border-customBlue p-2 rounded-md shadow-sm ${location.pathname === "/yournotes" ? "border-2 border-customBlue p-2 rounded-md shadow" : ""}`}>
                            {props.yournotes}
                        </Link>
                        <Link to="/addnotes" onClick={handleClick} className={`border-2 hover:border-customBlue p-2 rounded-md shadow-sm ${location.pathname === "/addnotes" ? "" : ""}`}>
                            {props.home}
                        </Link>
                        <Link to="/about" onClick={handleClick} className={`border-2 hover:border-customBlue p-2 rounded-md shadow-sm ${location.pathname === "/about" ? "" : ""}`}>
                            {props.about}
                        </Link>

                        {/* Mobile Login/Signup or Logout */}
                        {!localStorage.getItem('token') ? (
                            <Link to="/login" className="flex items-center bg-customWhite text-customBlue border-none p-2 rounded-xl mt-20 gap-2">
                                Login
                                <HiOutlineLogin />
                            </Link>
                        ) : (
                            <button onClick={handleLogout} className="flex items-center bg-customWhite text-customBlue hover:bg-customBlue hover:text-customWhite border-none p-2 rounded-xl mt-20 gap-2">
                                Logout
                                <FaPersonRunning />
                            </button>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { IoMdLock } from "react-icons/io";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const CONST_API_USER = "https://inotebook-u0jj.onrender.com/api/auth"

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading spinner
        const { name, email, password } = credentials;
        const response = await fetch(`${CONST_API_USER}/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Account Created Successfully", "success");
            navigate('/');
        } else {
            props.showAlert("Invalid credentials", "error");
        }
        setLoading(false); // Hide loading spinner after API call
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className='flex flex-col md:flex-row items-center justify-between sm:mx-3 lg:mx-20 '>
                <div className="text-center md:text-left sm:py-4 space-y-4 md:space-y-6">
                    <h1 className="text-3xl text-customPrimarySignup sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium">
                        iNOTEBOOK
                    </h1>
                    <p className="font-semibold text-customDarkSignup text-base sm:text-lg md:text-xl lg:text-2xl">
                        Your notes on the cloud ☁️
                    </p>
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl text-customDarkSignup">
                        Create an account to continue using iNotebook ☀️
                    </span>
                </div>
                <div>

                    <form className="mt-10 md:mt-0 max-w-md w-screen items-center space-y-3 px-2" onSubmit={handleSubmit}>
                        <h1 className="text-4xl text-center text-customPrimarySignup">Create an Account</h1>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-lg font-medium ">Name</label>
                            <div className='relative'>
                                <button className="absolute inset-y-0 left-4 flex items-center text-sm text-customDarkSignup">
                                    <FaUser />
                                </button>
                                <input type="text" className="w-full px-10 py-2 border-2 border-customPrimarySignup rounded-lg focus:outline-none focus:ring-2 focus:ring-customPrimarySignup"
                                    placeholder='Name'
                                    id="name"
                                    onChange={onChange}
                                    name='name'
                                    value={credentials.name} required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-lg font-medium ">Email address</label>
                            <div className='relative'>
                                <button className="absolute inset-y-0 left-4 flex items-center text-sm text-customDarkSignup">
                                    <IoMail />
                                </button>
                                <input
                                    type="email"
                                    className="w-full px-10 py-2 border-2 border-customPrimarySignup rounded-lg focus:outline-none focus:ring-2 focus:ring-customPrimarySignup"
                                    onChange={onChange}
                                    value={credentials.email}
                                    id="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-lg font-medium ">Password</label>
                            <div className="relative">
                                <button className="absolute inset-y-0 left-4 flex items-center text-sm text-customDarkSignup">
                                    <IoMdLock />
                                </button>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full px-10 py-2 border-2 border-customPrimarySignup rounded-lg focus:outline-none focus:ring-2 focus:ring-customPrimarySignup" id="password"
                                    onChange={onChange}
                                    name="password"
                                    placeholder='Password'
                                    value={credentials.password} minLength={5}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-4 flex items-center text-sm text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="cpassword" className="block text-lg font-medium ">Confirm Password</label>
                            <div className="relative">
                                <button className="absolute inset-y-0 left-4 flex items-center text-sm text-customDarkSignup">
                                    <IoMdLock />
                                </button>
                                <input type={showPassword ? 'text' : 'password'}
                                    className="w-full px-10 py-2 border-2 border-customPrimarySignup rounded-lg focus:outline-none focus:ring-2 focus:ring-customPrimarySignup"
                                    id="cpassword"
                                    onChange={onChange}
                                    name="cpassword"
                                    placeholder='Confirm Password'
                                    value={credentials.cpassword}
                                    minLength={5}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-4 flex items-center text-sm text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="justify-center grid grid-cols-1 ">
                            <button
                                type="submit"
                                className="bg-customPrimarySignup text-white font-semibold px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors w-full sm:w-auto flex items-center justify-center"
                                disabled={loading}  // Disable button when loading
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                ) : "Create Account"}
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 px-2">
                        <span className="text-customPrimarySignup">Already have an account? </span> <Link to="/login" className="text-indigo-600 hover:underline">Login &rarr;</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;

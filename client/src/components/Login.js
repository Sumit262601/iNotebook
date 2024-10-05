import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);  // New state for loading spinner
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loading spinner
        try {
            const response = await fetch(`https://cloud-api-ewam.onrender.com/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });

            const json = await response.json(); // Parse JSON if response is OK

            if (json.success) {
                localStorage.setItem('token', json.authtoken);
                props.showAlert("Login Successfully", "success");
                navigate('/');
            } else {
                props.showAlert("Invalid credentials", "error");
            }
        } catch (error) {
            console.error("Error during login:", error);
            props.showAlert("Something went wrong", "error");
        }
        setLoading(false); // Hide loading spinner after API call
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between mx-48 sm:mx-3 lg:mx-20">
                <div className="text-center md:text-left sm:py-4 space-y-4 md:space-y-6">
                    <h1 className="text-3xl text-customPrimaryLogin sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium">
                        iNOTEBOOK
                    </h1>
                    <p className="font-semibold text-customAccentLogin text-base sm:text-lg md:text-xl lg:text-2xl">
                        Your notes on the cloud ☁️
                    </p>
                </div>
                <div>
                    <form className="mt-10 md:mt-0 max-w-xl w-screen items-center space-y-6" onSubmit={handleSubmit}>
                        <h1 className="text-4xl text-center text-customPrimaryLogin">Login</h1>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-lg font-medium">Email address</label>
                            <div className='relative'>
                                <button className="absolute inset-y-0 left-4 flex items-center text-sm text-gray-600">
                                    <FaUser />
                                </button>
                                <input
                                    type="email"
                                    className="w-full max-w-full px-10 py-2 border-2 border-customPrimaryLogin rounded-lg focus:outline-none focus:ring-2 focus:ring-customSecondaryLogin"
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
                            <label htmlFor="password" className="block text-lg font-medium">Password</label>
                            <div className="relative">
                                <button className="absolute inset-y-0 left-4 flex items-center text-sm text-gray-600">
                                    <IoMdLock />
                                </button>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="w-full px-10 py-2 border-2 border-customPrimaryLogin rounded-lg focus:outline-none focus:ring-2 focus:ring-customSecondaryLogin"
                                    onChange={onChange}
                                    value={credentials.password}
                                    id="password"
                                    name="password"
                                    minLength={5}
                                    placeholder="password"
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

                        <div className="mt-4 flex ic justify-between">
                            <span className="text-black">Having trouble in sign in?</span>
                        </div>

                        <div className="justify-center grid grid-cols-1 ">
                            <button
                                type="submit"
                                className="bg-customPrimaryLogin text-white font-semibold px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors w-full sm:w-auto flex items-center justify-center"
                                disabled={loading}  // Disable button when loading
                            >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                                ) : "Login"}
                            </button>
                        </div>
                    </form>
                    <div className="my-4">
                        <span className="text-customPrimaryLogin">Don't have an account?</span> <Link to="/signup" className="text-indigo-600 hover:underline">Signup &rarr;</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;

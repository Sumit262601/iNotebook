import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import { USER_API_END_POINT } from '../utils/constant';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://cloud-api-y3wl.onrender.com/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });

            const json = await response.json(); // Parse JSON if response is OK

            if (json.success) {
                // Save the token and redirect
                localStorage.setItem('token', json.authtoken);
                props.showAlert("Login Successfully", "success");
                navigate('/');
            } else {
                props.showAlert("Invalid credentials", "danger");
            }

        } catch (error) {
            console.error("Error during login:", error);
            props.showAlert("Something went wrong", "danger");
        }
    }


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='container my-5'>
                <div className="text-center">
                    <h1 className="display-3">iNOTEBOOK</h1>
                    <p className='fw-semibold'>Your notes on cloud ☁️ </p>
                    <span>Login to continue using iNotebook ☀️</span>
                </div>
                <form action='' className='px-5' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control border border-3" onChange={onChange} value={credentials.email} id="email" name='email' placeholder='example@gmail.com' aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control border border-3" onChange={onChange} value={credentials.password} id="password" name='password' minLength={5} required />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary col-md-1">Login</button>
                    </div>
                    <div className="text-center my-4">
                        <span style={{ color: 'purple' }}>Don't have an account?</span> <Link href='' to="/signup"> Signup &rarr; </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
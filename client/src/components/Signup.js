import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import { USER_API_END_POINT } from '../utils/constant';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch(`https://cloud-api-ewam.onrender.com/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        // console.log(json);
        if (json.success){
            // Save a token and redirect
            localStorage.setItem('token', json.authtoken) 
            props.showAlert("Account Created Successfully", "success")
            navigate('/');

        } else {
            props.showAlert("Invalid cerdentials", "danger")
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }


    return (
        <div>
            <>
                <div className='container'>
                    <div className="text-center">
                        <h1 className="display-4">iNOTEBOOK</h1>
                        <p className='fw-semibold'>Your notes on cloud ☁️ </p>
                    </div>
                    <form action='' className='px-5' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control border border-3" id="name" onChange={onChange} name='name' value={credentials.name} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control border border-3" placeholder='example@gmail.com' value={credentials.email} id="email" onChange={onChange} aria-describedby="emailHelp" name='email' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control border border-3" id="password" onChange={onChange} name="password" value={credentials.password} minLength={5} required  />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cpassword" className="form-label">Comfirm Password</label>
                            <input type="password" className="form-control border border-3" id="cpassword" onChange={onChange} name="cpassword" value={credentials.cpassword} minLength={5} required  />
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button type="submit" className="btn btn-primary col-md-1">SignUp</button>
                        </div>
                        <div className="text-center my-4">
                            <span style={{ color: 'purple' }}>Already have an account? </span> <Link to="/login"> Login &rarr; </Link>
                        </div>
                    </form>
                </div>
            </>
        </div>
    )
}

export default Signup

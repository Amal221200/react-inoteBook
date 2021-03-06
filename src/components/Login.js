import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ showAlert }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({ email: '', password: '' })

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email: user.email, password: user.password })
        })
        const data = await res.json()
        if (data.success) {
            localStorage.setItem("token", data.authToken)
            navigate('/')
            showAlert('Logged in successfully', 'success', 'welcome')
        } else {
            showAlert('Invalid credentials', 'danger', 'error')
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={user.email} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' autoComplete='' value={user.password} onChange={onChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className='my-3 text-center'>
                <Link to="/signup" className="text-info text-decoration-none">If you don't have an account, sign up</Link>
            </div>
        </>
    )
}

export default Login
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = ({ showAlert }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState({ name: '', email: '', password: '', cpassword: '' })

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const [cp, setcp] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user.password === user.cpassword) {
            const res = await fetch(`http://localhost:5000/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
            })
            const data = await res.json()
            if (data.success) {
                localStorage.setItem("token", data.authToken)
                navigate('/')
                showAlert(`Successfully created user ${user.name}`, 'success')
            }else{
                showAlert('Invalid details. Try using an email which is not used by another user', 'danger', 'error')
            }
        } else {
            setcp(false)
            showAlert('Please enter Confirm Password field same as the Password', 'danger', 'error')
            return
        }
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" value={user.name} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={user.email} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' autoComplete='' value={user.password} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' autoComplete='' value={user.cpassword} onChange={onChange} minLength={5} required />
                </div>
                <div style={{ height: '40px' }}>
                    <h5 className='text-danger'>{!cp ? '*Please enter Confirm Password field same as the Password' : ""}</h5>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
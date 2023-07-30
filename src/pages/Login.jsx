import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(false)
        try {
            setLoading(true)
            const loginData = {
                email: email,
                password: password
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'content-Type': 'application/json'},
                body: JSON.stringify(loginData)
            }
            const login = await fetch( `https://peerxp-api.vercel.app/api/login`, requestOptions);
            const res = await login.json();
            if(!login.ok){
                console.log('server issue')
                setErr(true)
                return setLoading(false)
            }  else {
                localStorage.setItem('auth', res.results._id);
                setLoading(false)
                navigate('/'); // Navigate only when the login is successful
              }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

  return (
    <div className=' h-screen w-full flex justify-center items-center bg-gray-200'>
        <div className=' h-80 w-72 bg-slate-300 flex justify-between items-center flex-col rounded-md py-2'>
            <h1 className=' font-bold text-xl'>Login</h1>
            <form className=' w-[95%] flex gap-5 flex-col' onSubmit={handleSubmit}>

                <label for='mail'>Email</label>
                <input type='email' id='mail' className=' w-full py-2 px-2 border-none outline-none' value={email} onChange={(e) => {setEmail(e.target.value)}} required/>
                <label for='pass'>Password</label>
                <input type='password' id='pass' className=' w-full py-2 px-2 border-none outline-none' value={password} onChange={(e) => {setPassword(e.target.value)}} required/>
                <button onClick={handleSubmit} className=' bg-sky-400 text-white w-full py-2'>{loading ? 'logging in...' : 'sign in'}</button>
            </form>
            {err && <span className=' text-red-500'>Invalid Credentials</span>}
        </div>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import './Ragister.scss'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
const Ragister = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [loading, SetLoading] = useState(false)
  const navigate = useNavigate();


  const signUpHandler = async (e) => {
    e.preventDefault();
    SetLoading(true)
    try {
      const res = await axios.post('http://localhost:8000/user/ragister', { email, name, password });
      console.log(res.data)
      SetLoading(false);
      navigate('/')
    } catch (error) {
      console.log(error)
      SetLoading(false)

      toast.error(` ${error.response.data} `, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",

      });
    }
  }

  return (
    (
      <div className='login-container'>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="img-container">
          <img src="/application.png" alt="" />
        </div>
        <div className="login-box">
          <p>Ragister Your Account</p>
          <TextField id="standard-basic" name='email' label="E-mail" variant="standard" onChange={(e) => setEmail(e.target.value)} />
          <TextField id="standard-basic" name='name' label="Name" variant="standard" onChange={(e) => setName(e.target.value)} />

          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            name='password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="outlined" onClick={signUpHandler}>SignUp</Button>
          <p className='belowText'>Already have an account?&nbsp;
            <Link style={{ cursor: 'pointer' }} to='/'>Login</Link>
          </p>

        </div>
      </div>
    )
  )
}

export default Ragister
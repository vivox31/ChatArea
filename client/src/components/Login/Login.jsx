import React, { useState } from 'react'
import './Login.scss'
import { Backdrop, Button, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
const Login = () => {
  const [email,setEmail]= useState();
  const [password,setPassword] = useState();
  const [loading, SetLoading] = useState();
 const navigate = useNavigate()
  const signInHandler = async(e)=>{
    e.preventDefault();
    SetLoading(true)
    try {
      const res = await axios.post('http://localhost:8000/user/login',{email,password});
      console.log(res.data);
      localStorage.setItem('userData',JSON.stringify(res.data))
      SetLoading(false)
      navigate('/app/')
    } catch (error) {
      console.log(error);
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
        ></Backdrop>
      <div className="img-container">
        <img src="/application.png" alt="" />
      </div>
      <div className="login-box">
        <p>Login To Your Account</p>
        <TextField id="standard-basic" label="E-mail" variant="standard" name='email' onChange={(e)=>setEmail(e.target.value)}/>
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <Button variant="outlined" onClick={signInHandler}>Login</Button>
        <p className='belowText'>Don't have an account?&nbsp;
          <Link style={{cursor:'pointer'}} to='/ragister'>ragister</Link>
        </p>

      </div>
    </div>
  )
}

export default Login
import React,{useEffect, useState} from 'react'
import "../App.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
  const source = process.env.REACT_APP_SOURCE;
  const navigate = useNavigate();

  useEffect(()=> {
    if (localStorage.getItem("userData")) {
      navigate('/')
    }
  },[])
  const [data,setData] = useState({
    email:"",
    password: ""
  })
  const HandelLInput = (event) => {
    setData({...data,[event.target.name]: event.target.value});
  }
  const HandelLSubmit = (event) => {
    event.preventDefault();
    axios.post(`${source}/user/details`,data)
    .then((res)=> {
      if (res.data.message === "Password is wrong" || res.data.message === "User not found") {
        alert(res.data.message)
      }
      else {
        localStorage.setItem('userData',JSON.stringify(res.data));
        navigate('/')
      }
    })
    .catch((err)=>console.log(err));
  }

  return (
    <div className='Register'>
      <div className='RegisterContainer'>
        <span className='RegisterHead'>Secure Chat</span>
        <span className='RegisterTitle'>Login</span>
        <form className='RegisterForm' onSubmit={HandelLSubmit}>
            <input 
              type="email" 
              name="email"
              placeholder='email' 
              className='Email'
              autoFocus
              onChange={(e)=>HandelLInput(e)}
            />

            <input 
              type="password"
              name="password" 
              placeholder='password' 
              className='Password'
              onChange={(e)=>HandelLInput(e)}
            />

            <input 
              type="submit" 
              value="Sign in" 
              className='SubmitBtn'
            />
        </form>
        <p className='RegisterLinkLogin'>You don't have an account?<span className='Linker' onClick={()=>navigate('/register')}> Register</span> </p>
      </div>
    </div>  
  )
}

export default Login

import React,{useEffect, useState} from 'react'
import "../App.css";
import { useNavigate } from 'react-router-dom';
import Avtar from "../assets/avtar.png";
import axios from "axios";

const Register = () => {
  const source = process.env.REACT_APP_SOURCE;
  const navigate = useNavigate();

  useEffect(()=> {
    if (localStorage.getItem("userData")) {
      navigate('/');
    }
  },[])
  const [data,setData] = useState({
    name:"",
    email:"",
    password:"",
    con_pass:"",
    file: ""
  })
  const HandelFile = (e)=> {
    setData({...data, [e.target.name]: e.target.files[0]})
  }
  const HandelInput = (e)=> {
    setData({...data, [e.target.name]: e.target.value})
  }
  // var formData
  const HandelSubmit = (e)=> {
    e.preventDefault();
    var formData = new FormData();
    formData.append("name",data.name);
    formData.append("email",data.email);
    formData.append("password",data.password);
    formData.append("file",data.file);

    const config = {
      headers: {
        "Content-Type":"multipart/form-data"
      }
    }
    // console.log("data is",formData);
    if (data.name&&data.email&&data.password&&(data.password === data.con_pass)) {
      axios.post(`${source}/user/auth`,formData,config)
      .then((res)=> {
        alert(res.data.message)
        navigate('/login');
      })
      .catch((err)=>console.log(err))
    }
    else {
      alert("Invalid Input")
    }
  }


  return (
    <div className='Register'>
      <div className='RegisterContainer'>
        <span className='RegisterHead'>Secure Chat</span>
        <span className='RegisterTitle'>Register</span>
        <form className='RegisterForm' onSubmit={HandelSubmit}>
            <input 
              type="text"
              placeholder='name'
              className='Name' 
              name="name"  
              onChange={(e)=>HandelInput(e)}  
              autoFocus
              required
            />

            <input 
              type="email" 
              placeholder='email' 
              className='Email' 
              name="email" 
              onChange={(e)=>HandelInput(e)}
              required
            />

            <input 
              type="password" 
              placeholder='password' 
              className='Password' 
              name="password" 
              onChange={(e)=>HandelInput(e)}
              required
            />

            <input 
              type="password" 
              placeholder='confirm password' 
              className='Password' 
              name="con_pass" 
              onChange={(e)=>HandelInput(e)}
              required
            />

            <input 
              type="file" 
              aria-label="Profile photo" 
              // placeholder='file' 
              className='FileUpload' 
              name="file" 
              onChange={(e)=>HandelFile(e)}
              required
            />

            {/* <label htmlFor='fileForm' className='FileForm'> 
                <img src={Avtar}alt="Avtar image" className='avtarImage'/>
                <span>Add an avatar</span>
            </label> */}

            <input 
              type="submit" 
              value="Sign up" 
              className='SubmitBtn'
            />

        </form>

        <p className='RegisterLinkLogin'>You do have an account? <span className='Linker' onClick={()=>navigate('/login')}> Login</span></p>
      </div>
    </div>  
  )
}

export default Register

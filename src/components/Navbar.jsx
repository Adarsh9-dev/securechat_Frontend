import React,{useEffect} from 'react'
import NoUser from "../assets/noUser.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const source = process.env.REACT_APP_SOURCE;
  const navigate = useNavigate()
  const data = JSON.parse(localStorage.getItem("userData"));
  useEffect(()=> {
    if (!localStorage.getItem("userData")) {
      navigate('/login');
    }
  },[])
  const HandelLogout = () => {
    const isLogout = window.confirm("Do you want to Exit");
    if (isLogout === true) {
      localStorage.removeItem("userData");
      navigate('/login');
    }
  }

  const image = `https://securebackend.onrender.com/image/${data.file}`
  // console.log(data.file)
  return (
    <div className='Navbar'>
        <span className='Logo'>Secure Chat</span>
        <div className='About'>
            <img src={data.file ? image : NoUser } alt="Your Image" className='TrailImage' />
            <span className='AboutHead'>{data.name}</span>
            <button className='LogoutBtn' onClick={HandelLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
            </button>
        </div>
    </div>
  )
}

export default Navbar

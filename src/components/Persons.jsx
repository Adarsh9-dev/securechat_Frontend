import React,{useState,useEffect} from 'react'
import NoUser from "../assets/noUser.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';


const Persons = (props) => {
  const source = process.env.REACT_APP_SOURCE;
  const [personFile, setPersonFile] = useState("");
  const [personName, setPersonName] = useState("");
  axios.post(`${source}/user/searchById`, {"id": props.pData})
    .then((res)=> {
      setPersonFile(res.data[0].file);
      setPersonName(res.data[0].name);
    })
    .catch((err)=>console.log(err));

  const image = `${source}/image/${personFile}`
  return (
    <div className='Person'>
      <img src={personFile ? image : NoUser} alt="User Image"  className='PersonImage'/>
      <div className='PersonName'>
        <span className='PersonNameHead'>{personName}</span>
        {
          props.message &&
            <span className='MessageTitle'>{props.message}</span>
        }
      </div>
      
      {
        props.online &&
          <div className='IsOnline'>
            <span><FontAwesomeIcon icon={faCircle}/></span>
          </div>
      }
    </div>
  )
}

export default Persons

import React,{useState,useEffect,memo} from 'react'
import NoUser from "../assets/noUser.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';


const Persons = (props) => {
  const source = process.env.REACT_APP_SOURCE;
  const [isMessage, setIsMessage] = useState(false);
  const count = props.uniqueId.indexOf(props.data._id);

    useEffect(()=> {
        if (count >= 0) {
            setIsMessage(true);
        }
    },[])

  const image = `${source}/image/${props.data.file}`
  return (
    <div className='Person'>
      <img src={props.data.file ? image : NoUser} alt="User Image"  className='PersonImage'/>
      <div className='PersonName'>
        <span className='PersonNameHead'>{props.data.name}</span>
        { isMessage &&
            <span className='MessageTitle'>{props.uniqueData[count].message}</span>
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

// export default Persons
export default memo(Persons);

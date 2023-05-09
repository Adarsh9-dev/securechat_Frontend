import React, { useState, useEffect, useMemo} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass, faCircleXmark} from "@fortawesome/free-solid-svg-icons"
import axios from 'axios'
import Persons from './Persons'
import DefaultPerson from "./DefaultPerson";
import {io} from "socket.io-client";


const Search = (props) => {
  const source = process.env.REACT_APP_SOURCE;
  const [name,setName] = useState("");
  const [info,setInfo] = useState([]);
  const [isSearch,setIsSearch] = useState(false);
  const [isUser,setIsUser] = useState(false);
  // const [cross,setCross] = useState(false);
  const [personData,setPersonData] = useState([]);
  const [uniqueId, setUniqueId] = useState([]);
  let userInfo= JSON.parse(localStorage.getItem("userData"));
  const [socket, setSocket] = useState(null);
  const [activeNow, setActiveNow] = useState([]);
  
  useEffect(()=> {
    setSocket(io(`${source}`))
  },[])
  
  useEffect(()=> {
    socket?.on("getUsers",users => {
      const activeUser = [];
      users.map((index)=> {
        if (index.userId !== userInfo._id) {
          activeUser.push(index.userId);
        }
      })
      setActiveNow(activeUser)
      console.log("Search Active id> ",users)
    })
  },[socket])

  useEffect(()=>{
    userInfo = JSON.parse(localStorage.getItem("userData"));
    let pInfo = {
      "senderId": userInfo._id
    }
    axios.post(`${source}/conversation/all`,pInfo)
    .then((res)=> {

      setUniqueId(res.data.uInfo) 
      setPersonData(res.data.uData)
    })
    .catch((err)=>console.log(err))

  },[props.isSent])
  
  const HandelInput = (e)=> {
    setName(e.target.value);
    setName(e.target.value);
    const data = {
      name: e.target.value
    }
    axios.post(`${source}/user/search`,data)
    .then((res)=> {
      if (res.data.length === 0) {
        setIsUser(true);
      }
      else {
        setIsUser(false);
      }
      
      setInfo(res.data);
      
      if (e.target.value === "" ) {
        setIsSearch(false);
      } else {
        setIsSearch(true);
      }

    })
    .catch((err)=>console.log(err))
  }
  
  const HandelCross = () => {
    setName("")
    setIsSearch(false)
    // setCross(false);
  }

  const HandelMessage = (id)=> {
    // sessionStorage.setItem("clickId",id);
    props.PersonId(id);
    // console.log(id)
  }

  const HandelSearchMessage = (id) => {
    props.PersonId(id);
    console.log(id);
  }

  return (
    <>
    <div className='Search'> 
       <div className='SearchDown'>
            <input type="text" className='SearchHead' placeholder='Find a user' value={name} onChange={(e)=>HandelInput(e)}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="searchOk"/>
            {
              isSearch && <FontAwesomeIcon icon={faCircleXmark} className="searchCross" onClick={HandelCross}/>
            }
        </div>
    </div>

    {isSearch ? 
      !isUser ?
        info.map((index,i)=> 
          (index._id !== userInfo._id) && 
            activeNow.find(user =>  user === index._id)? 
              <div onClick={()=>HandelSearchMessage(index._id)}>
                <DefaultPerson search={isSearch} data={index} uniqueId={uniqueId} uniqueData={personData} online={true}/>
              </div> :
              <div onClick={()=>HandelSearchMessage(index._id)}>
                <DefaultPerson search={isSearch} data={index} uniqueId={uniqueId} uniqueData={personData} online={false}/>
              </div>
            ):
            <div className="noUser">No user found</div>
      :
      <div>

      {
        personData.map((index,i)=> 
          index.receverId === userInfo._id ? 
            activeNow.find(user =>  user === index.senderId)? 
              <div onClick={()=>HandelMessage(uniqueId[i])}> 
                <Persons message={index.message} pData={uniqueId[i]} online={true} />
              </div>:
              <div onClick={()=>HandelMessage(uniqueId[i])}> 
                <Persons message={index.message} pData={uniqueId[i]} online={false} />
              </div>: 
            
            activeNow.find(user =>  user === index.receverId)? 
              <div onClick={()=>HandelMessage(uniqueId[i])}> 
                <Persons message={index.message} pData={uniqueId[i]} online={true} />
              </div>:
              <div onClick={()=>HandelMessage(uniqueId[i])}> 
                <Persons message={index.message} pData={uniqueId[i]} online={false} />
              </div>
        )
      } 
        
      </div>
    }

    </>
  )
}

export default Search

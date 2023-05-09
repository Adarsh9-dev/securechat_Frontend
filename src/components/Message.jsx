import React, { useState,useEffect, useRef } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faVideo,faUserPlus, faBars,faUserSecret} from "@fortawesome/free-solid-svg-icons"
import MessageCard from './MessageCard';
import axios from "axios";
import Typing from "../assets/typing1.gif";

const Message = ({PersonId,setInput,setTyping}) => {
  const source = process.env.REACT_APP_SOURCE;
  const [user,setUser] = useState({})
  const [name,setName] = useState("");
  const [picture,setPicture] = useState();
  const [messageData,setMessageData] = useState([]);
  const [isMessage,setIsMessage] = useState(false);
  const messageEndRef = useRef(null);
  const [isTyping,setIsTyping] = useState(true)
  
  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem("userData"))
    setUser(userInfo);
    setIsMessage(false);
  },[])

  useEffect(()=>{
    const data = {
      id: PersonId
    }
    const info = {
      uId: user._id,
      pId: PersonId
    }

    axios.post(`${source}/user/searchById`,data)
      .then((res)=> {
        setName(res.data[0].name)
        setPicture(res.data[0].file)
      })
      .catch((err)=>console.log(err))

    if (PersonId) {
      axios.post(`${source}/conversation/personal`,info)
        .then((res)=> {
          console.log(res);
          setMessageData(res.data);
          setIsMessage(true);
          messageEndRef.current?.scrollIntoView();
        })
        .catch((err)=> {console.log(err)})
      }

        // console.log("setInput",setInput)
      },[PersonId])



    useEffect(()=> {
        if (PersonId) {
          const info = {
            uId: user._id,
            pId: PersonId
          }
          axios.post(`${source}/conversation/personal`,info)
          .then((res)=> {
            setMessageData(res.data);
            setIsMessage(true);
            messageEndRef.current?.scrollIntoView({behavior: "smooth"});
            // console.log("I am clicking")
          })
          .catch((err)=> {console.log(err)})
        }
      },[setInput])
      

      
  return (
    <div className='Message'>
        <div className='MessageHead'>
          <div className='MessageNameContainer'>
            <span className='MessageHeadName'>{name}</span>
            {/* <span className='MessageType'>Typing...</span> */}
            {
              setTyping&&
                <div className='TypingHead'>
                  <div className='TypingContainer'>
                    <span className='TypeName'>Typing</span>
                    <img src={Typing} className='Typing'/>
                  </div>
                </div>
            }
          </div>
            <div className='MessageHeadIcons'>
                <FontAwesomeIcon icon={faVideo} />
                <FontAwesomeIcon icon={faUserPlus} />
                <FontAwesomeIcon icon={faBars} /> 
            </div>
        </div>
        <div className='MessageBody' >
        {
          isMessage ? <div>
            {
              messageData.map((index,i) => 
                index.senderId === user._id ? 
                  <MessageCard picture={user.file} message={index.message} time={index.updatedAt} /> :
                  <MessageCard sender={true} picture={picture} message={index.message} time={index.updatedAt}/>   
              )
              
            } 
          
            <div ref={messageEndRef}/>        
          </div> : 
          <div className='MessageWelcome'> 
            <FontAwesomeIcon icon={faUserSecret} className="MessageWelcomeImage"/>
            <span className='MessageWelcomeText'>Welcome to Secure Chat </span>
          </div> 
        }
        </div>
        
    </div>
  )
}

export default Message

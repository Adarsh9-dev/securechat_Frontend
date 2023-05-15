import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import {io} from "socket.io-client";
// import "../../env"
// import {dotenv} from "dotenv";
// dotenv.config();

const Input = ({PersonId,setInput,setTyping}) => {
  console.log(process.env.REACT_APP_SOURCE);
  const source = process.env.REACT_APP_SOURCE;
  const [id, setId] = useState("");
  const [pId, setPId] = useState("");
  const [socket, setSocket] = useState(null)
  const [isTyping,setIsTyping]  = useState(false);
  const [message, setMessage] = useState("");
  const [check,setCheck] = useState(false);
  const person = "";

  useEffect(()=> {
    setSocket(io(`https://securebackend.onrender.com`))
  },[])


  useEffect(()=> {
    socket?.emit('addUser',id)
    socket?.on("getUsers",users => {
      console.log("Active Users: ",users)
    })
    socket?.emit("setPerson",{PersonId: person,id});

    socket?.on("getMessage", data=> {
      console.log("Data > ",data);
      setInput(data.message)
    })
    socket?.on("modifyMessage", data=> {
      console.log("Data > ",data.typing);
      console.log("Data.Message >", data.message);
      // setIsTyping(data.typing);
      // console.log("Person -> ",data.serverClickId);
      // console.log("Sender -> ",data.senderId)
      if (data.serverClickId === data.senderId) {
        if (message === "") {
          setTyping(true)
        }
        if (data.message === "") {
          setTyping(false);
        }
        setTimeout(()=> {
          setTyping(false);
        },2000)
      }
      else {
        setTyping(false);
      }
    })
  },[socket])


  useEffect(()=> {
    socket?.emit("changeMessage",{
      senderId: id,
      receverId: PersonId,
      message:message,
      typing: true
    })
    
  },[message])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"))
    setId(user._id);
  }, []);
 
  useEffect(()=> {
    setMessage("")
    socket?.emit("setPerson",{PersonId,id});
    console.log("Inside id",id);
    console.log("Inside PersonId",PersonId);
    
  },[PersonId])
  
  const HandelSubmit = (e) => {
    e.preventDefault();
    setTyping(false)
    socket?.emit("sendMessage", {
      senderId: id,
      receverId: PersonId,
      message: message
    })
    setMessage("")
    const messageData = {
      senderId: id,
      receverId: PersonId,
      message: message
    }
    axios.post(`https://securebackend.onrender.com/conversation/create`, messageData)
      .then(() => {
        setInput(message);
      })
      .catch((err) => console.log(err));
  }

  
  function HandeTyping(e) {
    
    // console.log("Hello")
    // setTyping(isTyping)
    // setMessage(e.target.value);
    // console.log("Message >",message)
  }
  return (
    <form onSubmit={(e) => HandelSubmit(e)}>
      {
        PersonId ?
          <div className='Input' style={{ backgroundColor: "white" }}>
            <div className='InputHead'>
              <input type="text" placeholder="Type something..." value={message} autoFocus className='InputHeadSearch' onChange={(e)=> {
                setMessage(e.target.value) ;
                HandeTyping(e);
               }} />
                
            </div>
            <div className='InputLink'>
              <FontAwesomeIcon icon={faPaperclip} />
              <FontAwesomeIcon icon={faImage} />
              <input type="submit" value="Send" id="send" style={{ display: 'none' }} />
              <label htmlFor='send'>
                <FontAwesomeIcon icon={faPaperPlane} className="messageSend" />
              </label>
            </div>
          </div>:
          <div className='Input' style={{ backgroundColor: "#dddcf7" }}></div>
      }
    </form>
  )
}

export default Input


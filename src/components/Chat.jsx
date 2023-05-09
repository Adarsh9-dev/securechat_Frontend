import React, { useEffect, useState } from 'react'
import Input from './Input'
import Message from './Message'

const Chat = ({personData,IsSentInfo}) => {
  const [isInput, setIsInput] = useState("");
  const [isTyping, setTyping] = useState(false);

  useEffect(()=> {
    // console.log(isInput)
    IsSentInfo(isInput);
  
  },[isInput])
  // console.log(isTyping)
  return (
    <div className='Chat'>
      <Message PersonId={personData} setInput={isInput} setTyping={isTyping}/>
      <Input PersonId={personData} setInput={setIsInput} setTyping={setTyping} />
    </div>
  )
}

export default Chat

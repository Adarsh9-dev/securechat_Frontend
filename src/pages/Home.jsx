import React, { useState } from 'react'
import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'

const Home = () => {
  const [person,setPerson] = useState("");
  const [isSent,setIsSent] = useState("");
  // console.log("In Home",person)
  
  return (
    <div className='Home'>
        <div className='HomeContainer'>
            <Sidebar HomePersonId={setPerson} isSent={isSent}/>
            <Chat personData={person} IsSentInfo={setIsSent}/>
        </div>
    </div>
  )
}

export default Home

import React,{useEffect, useState} from 'react'
import Navbar from './Navbar'
import Persons from './Persons'
import Search from './Search'

const Sidebar = (props) => {
  const [person,setPerson] = useState("");
  useEffect(()=> {
    props.HomePersonId(person);
  },[person])
  // console.log("Hello"+person);
  return (
    <div className='Sidebar'>
        <Navbar />
        <Search PersonId={setPerson} isSent={props.isSent}/>
    </div>
  )
}

export default Sidebar

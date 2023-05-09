import React from 'react'
import {format} from "timeago.js"

const MessageCard = (props) => {
  const source = process.env.REACT_APP_SOURCE;
  const Image = `${source}/image/${props.picture}`
  return (
    <>
    {
      props.sender ? 
        <div className='MessageContainer1'>
        <div className='MessageCard1'>
            <div className='MessageCardHead'>
                <img src={Image} alt="This is a image" className='MessageImage'/>
                <span className='MessageTime'>{format(props.time)}</span>
            </div>
            <div className='MessageCardBodyOuter1'>
                <span className='MessageInnerBody1'>{props.message}</span>
            </div>
        </div>
        </div> 
      :
        <div className='MessageContainer'>
        <div className='MessageCard'>
            <div className='MessageCardHead'>
                <img src={Image} alt="This is a image" className='MessageImage'/>
                <span className='MessageTime'>{format(props.time)}</span>
            </div>
            <div className='MessageCardBodyOuter'>
                <span className='MessageInnerBody'>{props.message}</span>
            </div>
        </div>
        </div> 
        
    }
    </>
  )
}

export default MessageCard

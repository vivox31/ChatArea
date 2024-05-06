import React from 'react'
import './conversation.scss';
import { Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'

const Conversation = ({item}) => {
 
  const userData = JSON.parse(localStorage.getItem('userData'))
  const navigate = useNavigate();
  var chatname = '';
  if(item.chatName && item.isGroupChat){
    chatname = item.chatName;
  }else{
    item.users.map((user)=>{
      if(user._id != userData._id){
        chatname = user.name
      }
    })
  }
  return (
    <motion.div className='conversation' 
    onClick={()=>navigate('chat/'+ item._id + '&' + chatname )}
    whileHover={{scale:1.05}} whileTap={{scale:0.9}}
    >
        <div className="profile-img">
        <Avatar/>
        </div>
        <div className="textarea">
            <span>{chatname}</span>
            <div>
                <span>{(item.latestMessage ? item.latestMessage.content : "No previous messages, click here to start a chat ")}</span>
                <span></span>
            </div>
        </div>
    </motion.div>
  )
}

export default Conversation
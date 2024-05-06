import { Avatar } from '@mui/material'
import React from 'react'
import './ChatArea.scss'
import {motion} from 'framer-motion'
const MessageOthers = ({item}) => {
  return (
    <motion.div initial={{opacity:0, x:'-50px', y:'50px'}} animate={{opacity:1, x:'0px',y:'0px'}} className='MessageOthers'>
        <div className="msg-profile-img">
            <Avatar/>
        </div>
        <div className='text'>
            <span><b>{item.sender.name}</b></span>
            <span>{item.content}</span>
            {/* <span style={{fontSize:"0.8rem", alignSelf:"end", marginTop:"5px"}}>{item.timeStamp}</span> */}
        </div>
    </motion.div>
  )
}

export default MessageOthers
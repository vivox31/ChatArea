import React from 'react'
import './ChatArea.scss'
import {animate, motion} from 'framer-motion'
const MessageSelf = ({item}) => {
  return (
    <motion.div initial={{opacity:0, x:'50px', y:'50px'}} animate={{opacity:1, x:'0px',y:'0px'}} className='MessageSelf'>
        <span>{item.content}</span>
        {/* <span style={{fontSize:"0.8rem" ,marginTop:'5px'}}>{item.createdAt}</span> */}
    </motion.div>
  )
}

export default MessageSelf
import {  DoneAllRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useRef, useState } from 'react'
import './workarea.scss'
const CreateGroup = () => {
    const [inputText, setInputText] = useState("")
  return (
    <div className='CreateGroup'>
        <input type="text" placeholder='Enter Group Name' onChange={(e)=>setInputText(e.target.value)}/>
        {
            inputText &&  <IconButton><DoneAllRounded/></IconButton>
        }
    </div>
  )
}

export default CreateGroup
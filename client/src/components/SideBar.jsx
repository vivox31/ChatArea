import React, { useContext, useEffect, useState } from 'react'
import './sidebar.scss'
import { IconButton } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { Search } from '@mui/icons-material';
import Conversation from './conversations/Conversation';
import { Link, useNavigate } from 'react-router-dom';
 import axios from 'axios'
import { RefreshContext } from '../refreshcontext/refreshContext';

const SideBar = () => {

  const [conversations, setConversations] = useState([])
  const {refresh,triggerRefresh} = useContext(RefreshContext);

  const userData = JSON.parse(localStorage.getItem('userData'))

  useEffect(()=>{
    const fetchChats = async ()=>{
      
    try {
      const res = await axios.get('http://localhost:8000/chat/',{
        headers :{
          token : "bearer " + userData.accesstoken
        }
    });
    setConversations(prev=>res.data)
    // console.log(conversations)
    } catch (error) {
      console.log(error)
    }
    }
    fetchChats();
  },[refresh])
  const navigate = useNavigate();

  return (
    <div className='sidebar'>
      <div className="header">
        <div>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </div>

        <div className='other-icons'>
        <Link to='/app/users'>
          <IconButton>
            <PersonAddIcon />
          </IconButton>
        </Link>

          <IconButton>
            <GroupAddIcon />
          </IconButton>

           <Link to='/app/createGroup'>
            <IconButton>
            <AddCircleIcon />
          </IconButton>
          </Link>
          

          <IconButton>
            <NightlightIcon />
          </IconButton>
        </div>

      </div>
      <div className="search">
        <IconButton>
          <Search />
        </IconButton>
        <input type="text " placeholder='Search' />
      </div>

      <div className="conversations">
        {conversations.map(item=>(
          <Conversation item={item}  key={item._id} />
          
        ))}
      </div>
    </div>
  )
}

export default SideBar
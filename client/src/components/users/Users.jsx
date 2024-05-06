import React, { useEffect, useState } from 'react'
import './users.scss'
import { Avatar } from '@mui/material';
import  axios  from 'axios';
const Users = () => {
    const [onlineUsers, setOnlineUsers] = useState([])

    const userData = JSON.parse(localStorage.getItem('userData'));
  // console.log(userData)
  useEffect(()=>{
    const getUsers = async ()=>{
    try {
      
      const res = await axios.get('http://localhost:8000/user/fetchUsers',{headers:{
        token : 'bearer ' + userData.accesstoken
      }});

    //   console.log(res.data);
      setOnlineUsers(res.data)
    } catch (error) {
      console.log(error)
    }
    }
    getUsers()
  },[])

  const createChat = async (userId)=>{
    try {
        const res = await axios.post('http://localhost:8000/chat/',
        {userId:userId},
        {
            headers :{
                token : "bearer " + userData.accesstoken
            }
        })
    console.log(res.data)
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className='users'>
        <div className="heading">Available Users</div>
        <div className="search">
            <input type="text" placeholder='Search' />
        </div>
        <div className="container">
            {onlineUsers.map((item)=>(
                <div  key={item._id} className="user" onClick={()=>createChat(item._id)}>
                    <div className="profileimg">
                        <Avatar/>
                    </div>
                    <div className="name">
                        <div>{item.name}</div>
                        <small>{item.email}</small>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Users
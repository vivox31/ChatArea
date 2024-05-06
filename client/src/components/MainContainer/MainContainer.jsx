import React from 'react'
import './mainContainer.scss'
import Workarea from '../workarea/Workarea'
import SideBar from '../SideBar'
import ChatArea from '../workarea/ChatArea'
import Welcome from '../workarea/Welcome'
import CreateGroup from '../workarea/CreateGroup'
import { Outlet, Route, Routes } from 'react-router-dom'



const MainContainer = () => (
  <div className='main-container'>
    <SideBar/>
    {/* <Workarea />
    <Routes>
    <Route path='/app/chat' element={<ChatArea/>}/>
    <Route path='app/' element={<Welcome/>} />
    <Route path='app/creategroups' element={<CreateGroup/>} />
    </Routes> */}
    {/* <ChatArea/> */}
    <Outlet/>
    {/* <Welcome/> */}
  </div>
)

export default MainContainer
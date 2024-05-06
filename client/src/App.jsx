import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Login from './components/Login/Login'
import MainContainer from './components/MainContainer/MainContainer'
import Welcome from './components/workarea/Welcome'
import ChatArea from './components/workarea/ChatArea'
import CreateGroup from './components/workarea/CreateGroup'
import Ragister from './components/Ragister/Ragister'
import Users from './components/users/Users'

function App() {
  
  const userData = localStorage.getItem('userData')
  return (
    <div className='App'>
      <Routes>

      <Route path='/' element={<Login/>} />
      <Route  path='/ragister' element={<Ragister/>}/>
      <Route path='app' element={<MainContainer/>} >
        <Route path='' element={<Welcome/>} />
        <Route path='createGroup' element={<CreateGroup/> }/>
        <Route path='chat/:_id' element={<ChatArea/>} />
        <Route path='users' element={<Users/>} />

      </Route>

      </Routes>
    </div>
  )
        
 
}

export default App

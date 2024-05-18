import React, { useContext, useEffect, useRef, useState } from 'react'
import './ChatArea.scss'
import { Avatar, IconButton } from '@mui/material'
import { Add, AddAPhotoRounded, AddBoxOutlined, AddCircle, AddOutlined, AllInbox, DeleteOutline, EmojiEmotions, PlusOne, Send } from '@mui/icons-material'
import MessageOthers from './MessageOthers'
import MessageSelf from './MessageSelf'
import axios, { all } from 'axios'
import {animate, motion, spring} from 'framer-motion'
import { useParams } from "react-router-dom";
import {io} from 'socket.io-client'
import EmojiPicker from 'emoji-picker-react';
import { red } from '@mui/material/colors'
import { useSelector } from 'react-redux'
const  ENDPOINT = 'http://localhost:3000'
var socket;
const ChatArea = () => {


    //----------all usestates and variable declaration------------------------
    const userData = JSON.parse(localStorage.getItem('userData'))
    const [allmessages,setAllMessages] = useState([]);
    const [content , setContent] = useState('');
    const [socketConnectionStatus, setSocketconnectionStatus] = useState(false)
    // const [isNewMsg, setIsNewMsg] = useState(false)
    const [openemoji, setOpenemoji] = useState(false)
    const ref = useRef()
    const containerRef = useRef();
    const params = useParams();
    const [chatid, chatUser] = params._id.split('&');
//----------------------------------------------------------------------------------------------

//-------------functions (for deleting chat and sending message)-------------------------------
    const handleDeleteChat = async()=>{
        try{
            const res = await axios.delete(`http://localhost:8000/chat/${chatid}`,{
                headers : {
                    token : 'bearer ' + userData.accesstoken
                }
            })
            console.log(res.data);

            }catch{
                console.log(error)
        }
    }

    const sendMessage = async ()=>{
        try {
            const res =  await axios.post('http://localhost:8000/message/',{
                content : content,
                chatId : chatid
            },{
                headers : {
                    token : "bearer " + userData.accesstoken
                }
            })
            console.log(res.data);
            setAllMessages([...allmessages,res.data]);
            setContent('');
            ref.current.value = "";
            socket.emit('new message', res.data);
            
        } catch (error) {
            console.log(error)
        }
    }
//----------------------------------------------------------------------------------------------  

//---------all the useEffect functions----------------------------------------------------------
    useEffect(()=>{

         containerRef.current.Top = containerRef.current.scrollHeight;
         socket = io(ENDPOINT);
        socket.emit('setup', userData);
        socket.on('connection', ()=>{
            setSocketconnectionStatus(prev=>!prev);
            // setIsNewMsg(true);
        })
            
    const fetchmessages = async()=>{
            try {
                const res = await axios.get(`http://localhost:8000/message/${chatid}`,{
                    headers : {
                        token : 'bearer ' + userData.accesstoken
                    }
                } )

             setAllMessages(prev=>res.data);
             socket.emit('join chat', chatid);


            } catch (error) {
                console.log(error);
            }
        }
        fetchmessages();  

        // socket.on('message received', (newMessage) => {
        //     setAllMessages([...allmessages,newMessage]);
        // });
        return () => {
            socket.disconnect();
        };
        
    },[chatid,userData.accesstoken,handleDeleteChat])


  useEffect(() => {
        // console.log('loop')
        socket.on('message recieved', (newMessage) => {
            setAllMessages([...allmessages, newMessage])
        });
    });

    useEffect(() => {
        // Scroll to the bottom of the messages container when messages are updated
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [allmessages]);
      
//------------------------------------------------------------------------------------------------ 

  return (
    <motion.div className='chatArea' >
        <div className="header">
            <div className="profile-img">
                <Avatar/>
            <div className="person-info">
                <span style={{fontSize:"1.2rem", fontWeight:"bold"}}>{chatUser}</span>
                <span style={{fontSize:"0.8rem"}}> &nbsp; Online</span>
            </div>
            </div>
            <IconButton style={{marginRight:'3%'}}  onClick={(e)=>handleDeleteChat()} ><DeleteOutline /></IconButton>
                
        </div>
        <div className="msg-container" ref={containerRef}>
            { allmessages.reverse().map((message,index)=>{
                const sender = message.sender;
                const self_id = userData._id;
                if(sender._id == self_id){
                   return <MessageSelf item={message} key={index}/>
                }else{
                    return <MessageOthers item={message} key={index}/>
                }
            }) 
            }
        </div>


        <div className="input-area">
            <div style={{display:'flex', alignItems:'center'}}>
            <EmojiEmotions onClick={()=>setOpenemoji(prev=>!prev)} style={{cursor:'pointer'}}/> 
            <input type="text" ref={ref} placeholder='Type Your Message' onChange={(e)=>setContent(e.target.value)} />
            </div>
            <IconButton onClick={()=>sendMessage()}>
                <Send/>
            </IconButton>
            <EmojiPicker open={openemoji} onEmojiClick={(e)=>{ref.current.value += e.emoji;  setContent(prev=>prev+e.emoji)}} />
        </div>

    </motion.div>
  )
}

export default ChatArea
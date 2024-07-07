import React, { useEffect, useRef, useState } from 'react'
import './chat.css';

import {useSelector} from 'react-redux';
import { userChats } from '../../api/ChatRequest';
import Conversationn from '../../components/conversationn/Conversationn';
import '../../pages/home/Home.css'
import {Link} from 'react-router-dom';
import Chatbox from '../../components/Chatbox/Chatbox';
import {io} from 'socket.io-client';
import { MdSupervisorAccount } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";



const Chat = () => {
    const {user} = useSelector((state)=>state.authReducer.authData);
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receiveMessage, setReceiveMessage] = useState(null);
    const serverPublic = "https://krish-media.onrender.com/images/";
    const socket = useRef();
 // get the chat in chat section
 useEffect(()=>{
    const getChats = async()=>{
        try{
            const {data} = await userChats(user._id);
            // console.log(data)
            setChats(data);
        }catch(err){
            console.log(err);
        }
    }
    
    getChats();
},[user]);
// const respo = ()=>{
//     document.querySelector("Chat-list")
// }
 // connect to socket.io
    useEffect(()=>{
        socket.current = io('https://krishsocket.onrender.com');
        socket.current.emit("new-user-add", user._id);
        socket.current.on('get-users',(users)=>{
            setOnlineUsers(users);
        })
    },[user]);

    // send msg to socket server
    useEffect(()=> {
        if(sendMessage!==null){
            socket.current.emit('send-message', sendMessage)
        }
    }, [sendMessage]);


    // receive mesg fro  socket server
    useEffect(()=> {
        socket.current.on("receive-message", (data)=> {
            console.log("data Received in parent chat.jsx", data)
            setReceiveMessage(data);
        })
    },[receiveMessage]);


     const cheeckOnlineStatus = (chat)=> {
        const chatMember = chat.members.find((member)=> member!== user._id);
        const online = onlineUsers.find((user)=> user.userId === chatMember);
        return online? true : false;
     }
   function chatting(){
    document.getElementsByClassName("Chat-container").style.display = "none";
   }
  return (
    <div className='Chat'>
      {/* Left side grid*/}
      <div className="Left-side-chat" style={{display: currentChat? "none": "block"}}>
        {/* <LogoSearch/> */}
        <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list" id="id" >
                {chats.map((chat)=>(
                   
                    <div  onClick={()=>{setCurrentChat(chat), chatting()}}>
                        
                        <Conversationn data = {chat} currentUserId={user._id} online={cheeckOnlineStatus(chat)}/>
                    </div>
))}
            </div>
        </div>
      </div>
      {/* Right side grid*/}
      <div className="Right-side-chat">
        {/* <div style={{width:"20rem", alignSelf:'flex-end'}}>
            <div className="navIcons">
                <Link to="../home">
                     <img src={Home} alt="" />
                </Link>
                <UilSetting />
                <img src={Noti} alt="" />
                <Link to="../chat">
                    <img src={Comment} alt="" />
                </Link>
             </div>
             
        </div> */}
        { /*chat body component */}
        <div className='chatbox'><Chatbox  chat={currentChat} currentUser={user._id}  setSendMessage={setSendMessage} receiveMessage = {receiveMessage}/></div>
      </div>
      <div className="Navi">
          <Link to="../home"><IoMdHome  /></Link>
          <Link to="../people"><MdSupervisorAccount /></Link>
          <Link to="../chat"><IoChatboxEllipses /></Link>
          <Link to={`/profile/${user._id}`}><img  src={user?(user.profilepicture?serverPublic+user.profilepicture:serverPublic+"defaultProfile.png"):""} /></Link>
        </div>
    </div>
  )
}

export default Chat

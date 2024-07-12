import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '../../api/UserRequest';
import './ChatBox.css';
import { addMessage, getMessages } from '../../api/MessageRequest';
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'

    const Chatbox = ({chat, currentUser, setSendMessage, receiveMessage}) => {
    const [userData, setUserData] = useState(null);
    const serverPublic = "https://krish-media.onrender.com/images/";
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef();
    const imageRef = useRef();
    const handleChange = async (newMessage)=>{
        setNewMessage(newMessage)
    }; 


    useEffect(()=> {
        if(receiveMessage !== null && receiveMessage.chatId === chat._id){
            setMessages([...messages, receiveMessage]);
        }
    }, [receiveMessage]);
    //fetching data for header
    useEffect(()=>{
        const userId = chat?.members?.find((id)=>id !== currentUser );
        const getUserData = async()=> {
            try{
                const {data}= await getUser(userId)
                setUserData(data);
            }catch(err){
                console.log(err);
            }
        }
        if(chat!==null)  {
            getUserData();
        }
    },[chat, currentUser]);

    // fetching data from messages...
    useEffect(()=>{
        const fetchmessages = async ()=> {
            try{
                const {data} = await getMessages(chat._id);
                setMessages(data);
            }catch(err){
                console.log(err);
            }
        };
        if(chat !== null){
            fetchmessages();
        } 
    },[chat]);
    //always scroll to the last msg
    useEffect(()=> {
        scroll.current?.scrollIntoView({ behavior : "smooth"});
    },[messages]);


  // send Message
    const handleSend = async (e)=>{
        e.preventDefault();
        const message = {
            senderId: currentUser,
            text: newMessage,
            chatId: chat._id,
        }
        //send msg to socket server..
        const receiverId = chat.members.find((id)=> id !== currentUser);
        // send message to database
        setSendMessage({...message, receiverId})
        // store msgs in mongodb..
        try{
            const {data} = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");
        }catch(err){
            console.log(err);
        }

    };

    useEffect(()=> {
        console.log("Message Arrived:", receiveMessage)
        if(receiveMessage !== null && receiveMessage.chatId === chat._Id){
            setMessages([...messages, receiveMessage]);
        }
    }, [receiveMessage]);

  return (
    <>
    <div className="ChatBox-container">
        {chat
        ?(
            <>
            <div className="chat-header">
                <div className="follower">
                    <div className='divv'>
                        <img src={userData?.profilepicture? serverPublic + userData.profilepicture : serverPublic + 'defaultProfile.png'} alt="" className='followerImage' style={{width: "50px", height:"50px"}} />
                        <div className="name" style={{fontSize: "0.9rem"}} >
                            <span>{userData?.firstname}{userData?.lastname}</span>
                            
                        </div>
                    </div>
                </div>
                <hr  style={{width:"85%", border:"0.1px solid #ececec"}} />
            </div>
            {/* chatbox messages.. */}
            <div className="chat-body">
                {messages.map((message)=>(
                    <>
                    <div ref={scroll}></div>
                    <div className={message.senderId === currentUser? "message own": "message"}>
                        
                        <span>{message.text}</span>
                        <span>{format(message.createdAt)}</span>
                    </div>
                    </>
                ))}
            </div>
            <div className="chat-sender">
                <div onClick={()=> imageRef.current.click()}>
                    +
                </div>
                <InputEmoji value={newMessage} onChange={handleChange}/>
                <div style={{marginTop:"0px"}} className="send-button button" onClick={handleSend}>Send</div>
                <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>
        </>
        )
        : (
            ""
        )
       }
        
    </div>
    </>
  );
};

export default Chatbox

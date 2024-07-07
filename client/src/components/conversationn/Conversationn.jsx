import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest';
import { useDispatch, useSelector } from 'react-redux';
import './conver.css';
const Conversationn = ({data, currentUserId, online }) => {
    const [userData, setuserData] = useState(null);
    const serverPublic = "https://krish-media.onrender.com/images/";
    const dispatch = useDispatch();
   

    useEffect(()=>{
        const userId = data.members.find((id)=>id!==currentUserId);
        const getUserData = async()=> {
            try{
                const {data}= await getUser(userId);
                setuserData(data);
                dispatch({type: "Save_USER", data: data});
                
            }catch(err){
                console.log(err);
            }
        }
        getUserData();

    },[]);

  return (
    <>
    <div className="follower conversation">
        <div>

            {online && <div className="online-dot"></div> 
               
            }
           
            <img src={userData?.profilepicture? serverPublic + userData.profilepicture : serverPublic + 'defaultProfile.png'} alt="" className='followerImage' style={{width: "50px", height:"50px"}} />
            <div className="name" style={{fontSize: "0.8rem"}} >
                <span>{userData?.firstname}{userData?.lastname}</span>
                <span>{online? "Online": "Offline"}</span>
            </div>
        </div>
    </div>
    <hr  style={{width:"85%", border:"0.1px solid #ececec"}} />
    </>
  )
}

export default Conversationn

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { geteAllUser } from '../../api/UserRequest';
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/ProfileCard.jsx/ProfileCard'
import RightSide from '../../components/RightSide/RightSide'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MdSupervisorAccount } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";
import './Post.css';
import FollowersCarddd from '../FollowersCard/FollowCardd';
const ViewPro = () => {
    const params = useParams();
    const [persons, setPersons] = useState([]);
    const {user} = useSelector((state)=>state.authReducer.authData);
    const serverPublic = "https://krish-media.onrender.com/images/";
    useEffect(()=>{
        const fetchPersons = async()=>{
            const {data} = await geteAllUser();
            setPersons(data);
        };
        fetchPersons();
    },[user]);
  return (

    <div className="Profile">
     <div className='followerss'> <FollowersCarddd/></div>

    <div className="Profile-center">
        {
            persons.map((person, id)=>{
                if(person._id === params.id){
                   return <div key={id}>
                       
                       <ProfileCard location="profilePage" person={person}/> 
                       <PostSide person={person}/>
                    </div>

                }
            })
        }
        


       </div>
        
    <RightSide/>
    <div className="Navi">
          <Link to="../home"><IoMdHome  /></Link>
          <Link to="../people"><MdSupervisorAccount /></Link>
          <Link to="../chat"><IoChatboxEllipses /></Link>
          <Link to={`/profile/${user._id}`}><img  src={user?(user.profilepicture?serverPublic+user.profilepicture:serverPublic+"defaultProfile.png"):""} /></Link>
        </div>

</div>
  )
}

export default ViewPro

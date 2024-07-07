import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MdSupervisorAccount } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { IoChatboxEllipses } from "react-icons/io5";



const Home = () => {
  const {user} = useSelector((state)=>state.authReducer.authData);
  const serverPublic = "https://krish-media.onrender.com/images/";


  return (
    <div className="Home">
        <ProfileSide /> 
        <PostSide />
        <RightSide />
        <div className="Navi">
          <Link to="../home"><IoMdHome  /></Link>
          <Link to="../people"><MdSupervisorAccount /></Link>
          <Link to="../chat"><IoChatboxEllipses /></Link>
          <Link to={`/profile/${user._id}`}><img  src={user?(user.profilepicture?serverPublic+user.profilepicture:serverPublic+"defaultProfile.png"):""} /></Link>
        </div>

      
    </div>
  )
}

export default Home
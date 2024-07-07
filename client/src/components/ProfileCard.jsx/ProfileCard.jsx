import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import {Link, Navigate, useNavigate} from 'react-router-dom';

import axios from "axios";
  const ProfileCard = ({location, person}) => {
  const {user} = useSelector((state)=>state.authReducer.authData);
  const posts = useSelector((state)=>state.postReducer.posts);
  const serverPublic = "https://krish-media.onrender.com/images/";
  const [startChat, setStartChat] = useState([]);
  const navigate = useNavigate();
  const handleChat = (e)=>{
    e.preventDefault();
    setStartChat({
      senderId:user._id,
      receiverId: person._id
    });
  }
  const createChat = (e)=> {
    e.preventDefault();
      axios.post("https://krish-media.onrender.com/chat/",startChat);
      
      navigate("../chat");
  }
  return (
    <div className="ProfileCard" onLoad={handleChat}>
      <div className="ProfileImages">
        <img src={person===undefined?(user.coverpicture? serverPublic + user.coverpicture : serverPublic + "defaultCover.jpg"):(person.coverpicture? serverPublic + person.coverpicture : serverPublic + "defaultCover.jpg")} alt="" />
        

        <img src={person===undefined?(user.profilepicture? serverPublic + user.profilepicture : serverPublic + "defaultProfile.png"):(person.profilepicture? serverPublic + person.profilepicture : serverPublic + "defaultProfile.png")} alt="" />
      </div>

      <div className="ProfileName">
        <span>{person===undefined?(user.firstname + user.lastname):(person.firstname + person.lastname)}</span>
        <span >{person===undefined? (user.jobrole? user.jobrole: "Your Bio not specified yet.."):(person.jobrole? person.jobrole: "Your Bio not specified yet..")}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{person===undefined?(user.following.length):(person.following.length)}</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{person===undefined?(user.followers.length):(person.followers.length)}</span>
            <span>Followers</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{person===undefined?(posts.filter((post)=>post.userId === user._id).length):(posts.filter((post)=>post.userId === person._id).length)}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
        {  person===undefined? "" :user._id===person._id?"":
            <div>
               <button onClick={person===undefined?"":createChat} className="button fc-button" style={{margin:"1rem"}}><span>Say Hi...to {person.firstname}{person.lastname}</span></button>
            </div>
        }
   
      </div>
      {location === "profilePage" ? ("") : <span>
        <Link style={{textDecoration:"none", color:"orange"}} to={`/profile/${user._id}`}>
        My Profile
        </Link>
        </span>}
    </div>
  );
};

export default ProfileCard;

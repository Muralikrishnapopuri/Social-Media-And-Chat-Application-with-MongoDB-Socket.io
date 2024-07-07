import React from 'react'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './PostSide.css'
import {  useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'



const PostSide = (person) => {
  const params = useParams();
  const {user} = useSelector((state)=>state.authReducer.authData);
  const serverPublic = "https://krish-media.onrender.com/images/";
  return (
    
   <div className="PostSide">
    {
      params.id ? 
      user._id === params.id? <PostShare />: <hr/> : <PostShare/>
    } 
    <hr/>
       <Posts/>

   </div>

   
  )
}

export default PostSide
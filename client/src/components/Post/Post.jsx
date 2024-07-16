import React, { useEffect, useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../api/PostRequest'
import {Link} from 'react-router-dom'
import axios from 'axios'

// import axios from 'axios'



const Post = ({data, persons}) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [userr, setuserr ] = useState([]);
  const serverPublic = "https://krish-media.onrender.com/images/"; 
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  const getcurrentUser = (e)=>{
    e.preventDefault();
    setuserr({
      currentId:user._id,
    });
  }
  const handleDelete = (e)=> {
    e.preventDefault();
      axios.delete(`https://krish-media.onrender.com/posts/${data._id}/${user._id}`);
      
  }
  
  return (
    <div className="Post" onLoad={getcurrentUser}>
        {persons. map((person, id)=>{
            if(person._id === data.userId){
            
              return <div  className='pro-head'><Link style={{textDecoration:"none"}} to={`/viewprofile/${person._id}`}><div>
              <img src={ 
                  serverPublic + person.profilepicture
                  ? serverPublic + person.profilepicture 
                  : serverPublic + "defaultProfile.png"
                  } alt="" 
                  className='followerImage' 
                  />
              <div className="name">
                  <span >{person.firstname}{person.lastname}</span>
                  <span >@{person.username}</span>
              </div>
         
          </div></Link>
          {
            person._id === user._id
            ? <button onClick={handleDelete} className='button fc-button'>Delete Post</button>
            : ""
          }

          </div>
             
            }
        })}

        <img src={data.image? serverPublic + data.image: ""} alt="" onDoubleClick={handleLike}/>


        <div className="postReact">
            <img src={liked ? Heart : NotLike} alt="" style={{cursor:"pointer"}} onClick={handleLike}/>
            <img src={Comment} alt="" />
            <img src={Share} alt="" />
        </div>


        <span style={{color: "var(--gray)", fontSize: '12px'}} >{likes} likes</span>

        <div className="detail">
            <span><b>{data.firstname}{data.lastname}</b></span>
            <span> {data.desc}</span>
        </div>
    </div>
  )
};

export default Post

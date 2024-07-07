import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { followUser, unFollowUser } from '../../actions/userAction';
import { Link } from 'react-router-dom';

const User = ({person}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state)=>state.authReducer.authData);
  const serverPublic = "https://krish-media.onrender.com/images/";
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
     );
  const handleFollow = ()=>{
    following
    ? dispatch(unFollowUser(person._id,user))
    : dispatch(followUser(person._id,user));
    setFollowing((prev)=>!prev);
  }

  return (
    <div className="follower">
              <Link style={{textDecoration:"none",paddingLeft:"1rem",paddingRight:"2rem"}} to={`/viewprofile/${person._id}`}>
                    <div className='divv'>
                    
                        <img src={ 
                            serverPublic + person.profilepicture
                            ? serverPublic + person.profilepicture 
                            : serverPublic + "defaultProfile.png"
                            } alt="" 
                            className='followerImage' 
                            />
                        <div className="name">
                            <span >{person.firstname}{person.lastname}</span>
                            <span>@{person.username}</span>
                        </div>
                        
                    </div>
                    </Link>
                    <button className={
                        following? "button fc-button UnfollowButton": "button fc-button"} onClick={handleFollow}>
                        {following? "Unfollow" : "Follow"}
                    </button>

                </div>
  )
}

export default User

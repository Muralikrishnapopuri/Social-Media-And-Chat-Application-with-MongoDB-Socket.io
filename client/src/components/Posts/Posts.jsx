import React, { useEffect, useState } from 'react'
import './Posts.css'
import Post from '../Post/Post';
import { useDispatch , useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/postAction';
import { useParams } from 'react-router-dom';
import { geteAllUser } from '../../api/UserRequest';
import FollowersCarddd from '../FollowersCard/FollowCardd';

const Posts = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const {user} = useSelector((state)=>state.authReducer.authData);
  let {posts, loading} = useSelector((state)=>state.postReducer);
  const [persons, setPersons] = useState([]);

  useEffect(()=>{
    const fetchPersons = async()=>{
        const {data} = await geteAllUser();
        setPersons(data); 
    };
    fetchPersons();
},[user]);

  useEffect(()=>{
    dispatch(getTimelinePosts(user._id));
  },[]);

if(!posts) return  "No posts";
if(params.id) posts = posts.filter((post)=>post.userId === params.id)


  return (
    <div className="Posts">
        {loading
        ? "Fetching Posts..."
        :posts.map((post, id)=>{
          return <Post persons={persons} data={post} id={id}/>
      })}
        <FollowersCarddd/>
    </div>
  );
};

export default Posts;
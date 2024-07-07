import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from "../../actions/AuthAction";
import entry from '../../img/entry.png'
const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state)=>state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(true);
  const [data,setData] = useState({firstname: "",lastname:"",username:"",password:"",confirmpass:""});
  const [confirmPass, setConfirmPass] = useState(true);
  const handleChange=(e)=>{
    setData({...data,[e.target.name]: e.target.value});
    
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(isSignUp)
      {
        data.password === data.confirmpass 
        ? dispatch(signUp(data))
        : setConfirmPass(false);
      }else{
        dispatch(logIn(data))
      }
  }
  const resetForm=()=>{
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname:"",
      username:"",
      password:"",
      confirmpass:""
    });
  }
  return (
    
    <div className="Auth">
      {/* left*/}
      <div className="a-left">
        <img src={entry} alt="" />
        <div className="Webname">
          <h1>Krish Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>
      {/* right*/}
      <div className="a-right">
      <form onSubmit={handleSubmit} className="infoForm authForm">
        <h3> {isSignUp?  "Sign up" : "Login"}</h3>
        {
          isSignUp && 
          <div>
          <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            onChange={handleChange}
            value={data.firstname}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
          />
        </div>
        }
        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="UserName"
            value={data.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
          {
            isSignUp &&
            <input
            type="password"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm Password"
            value={data.confirmpass}
            onChange={handleChange}
          />
          }
        </div>
        <span style={{display:confirmPass?"none":"block" , color: "red",fontSize:"12px",alignSelf:"flex-end",marginRight:"5px"}}>
          * Confirm Password is not same.
        </span>

        <div>
            <span style={{fontSize: '12px', cursor:"pointer"}} onClick={()=>{setIsSignUp((prev)=>!prev);resetForm()}}>{isSignUp ? "Already have an account. Login!" : "Don't have an account? Signup"}</span>
        </div>
        <button  className="button infoButton" type="submit" disabled={loading}>{loading? "Loading..." : isSignUp ? "Signup" : "Login"}</button>
      </form>
    </div>
      
    </div>
  );
};

export default Auth;

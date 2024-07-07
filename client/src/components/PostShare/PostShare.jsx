import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../actions/uploadAction";


const PostShare = () => {
  const loading = useSelector((state)=>state.postReducer.uploading);
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.authReducer.authData);
  const [image, setImage] = useState(null);
  const serverPublic = "https://krish-media.onrender.com/images/";
  
  const desc = useRef();
  
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef(); 
  const reset = ()=> {
    setImage(null);
    desc.current.value="";
  }
  const handleUpload = (e) => {
    e.preventDefault();
    const newPost = {
      userId : user._id,
      desc: desc.current.value,
    };
    if(image){
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file",image)
      newPost.image = filename;
      try{
        dispatch(uploadImage(data));
      }catch(err){
        console.log(err);
      }


    }
    dispatch(uploadPost(newPost));
    reset();
  }
  return (
    <div className="PostSharemain">
    <div className="PostShare">
      <img src={user.profilepicture? serverPublic + user.profilepicture : serverPublic + "defaultProfile.png"} alt="" />
      <div>
        <input ref={desc} required type="text" placeholder="What's happening" />
        
      {image && (

        <div className="previewImage">
          <UilTimes onClick={()=>setImage(null)}/>
          <img src={URL.createObjectURL(image)} alt="" />
        </div>

      )}


      </div>
      
    </div>
    <div className="postOptions">
          <div className="option" style={{ color: "var(--photo)" }}
          onClick={()=>imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>{" "}
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>{" "}
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>

          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        <div className="buttonn"> 
        <button className="button ps-button" onClick={handleUpload} disabled={loading}>
            {loading? "Uploading...":"Share"}
          </button>
          </div>
    </div>
  );
};

export default PostShare;

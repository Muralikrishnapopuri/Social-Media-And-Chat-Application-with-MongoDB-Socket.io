import { Modal , useMantineTheme} from "@mantine/core";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";
import { FaRegImage } from "react-icons/fa6";
import { FaImages } from "react-icons/fa";
import './ProfileModal.css';
const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const {password, ...other} = data ;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const {user} = useSelector((state)=>state.authReducer.authData);
  const profile = useRef();
  const cover = useRef();

  const handleChange =(e) => {
   setFormData({...formData, [e.target.name]: e.target.value});

  };
  const onImageChange = (e) => {
    if(e.target.files && e.target.files[0]){
      let img = e.target.files[0];
      e.target.name === "profilepicture" 
      ? setProfileImage(img)
      : setCoverImage(img);
    }
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    let UserData = formData;
    if(profileImage){
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name",fileName);
      data.append("file", profileImage);
      UserData.profilepicture = fileName;
      try{
        dispatch(uploadImage(data));
      }catch(err){
        console.log(err);
      }
    }
    if(coverImage){
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name",fileName);
      data.append("file", coverImage);
      UserData.coverpicture = fileName;
      try{
        dispatch(uploadImage(data));
      }catch(err){
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  }
  return (
    
    <Modal  className="modal"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="80%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form  className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
            
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}

          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="jobrole"
            placeholder="Bio"
            onChange={handleChange}
            value={formData.jobrole}

          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="Lives in"
            onChange={handleChange}
            value={formData.livesin}

          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
            name="relationship"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>

            
              <span id="img1" className="uploads" onClick={()=>{profile.current.click();document.querySelector("#img1").style.backgroundColor="green";document.querySelector("#img1").style.color="white"}}>Profile <FaRegImage /> </span>
           <span id="img2" className="uploads" onClick={()=>{cover.current.click();document.querySelector("#img2").style.backgroundColor="green";document.querySelector("#img2").style.color="white"}}>Background <FaImages />
           </span>
            <div style={{display:"none"}} >
            <input  ref={profile} style={{display:"hidden"}} type="file" name='profilepicture' onChange={onImageChange}/>
          </div>
           
            
        
        <div style={{display:"none"}}>

            <input  ref={cover} type="file" name="coverpicture" onChange={onImageChange}/>
            </div>

        <button className="button infoButton" onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
    
  );
};


export default ProfileModal;


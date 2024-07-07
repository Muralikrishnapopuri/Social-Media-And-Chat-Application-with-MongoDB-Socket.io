import { useSelector } from "react-redux";
import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/chat/chat";
import ViewPro from "./components/Post/viewPro";
import FollowersCarddd from "./components/FollowersCard/FollowCardd";
// import {ViewProfilee} from "./components/Post/ViewProfile.jsx"
function App() {
  const user = useSelector((state)=>state.authReducer.authData)
  return (
    <div className="App">
        <div className="blur" style={{top: '-18%', right: '0'}}></div>
        <div className="blur" style={{top: '36%', left: '-8rem'}}></div>
        <Routes>
          <Route path="/" element={user?<Navigate to="home"/>:<Navigate to="auth"/>}/>
          <Route path="/home" element={user? <Home/>: <Navigate to="../auth"/>}/>
          <Route path="/auth" element={user? <Navigate to="../home"/>:<Auth/>}/>
          <Route path="/profile/:id" element={user?<Profile/> : <Navigate to="../auth" />}/>
          <Route path="/viewprofile/:id" element={<ViewPro/>}/>
          <Route path="/chat" element={user? <Chat/> : <Navigate to="../auth"/>} />
          <Route path="/people" element={user? <FollowersCarddd/> : <Navigate to="../auth"/>}/>

        </Routes>
    </div>
  );
}

export default App;


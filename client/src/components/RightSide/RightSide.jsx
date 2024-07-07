import React, { useState } from "react";
import "./RightSide.css";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
// import FollowersCard from "../FollowersCard/FollowersCard";
import FollowersCarddd from "../FollowersCard/FollowCardd";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSidee">
      {/* <TrendCard /> */}
      <FollowersCarddd/>

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;

import React, { useEffect } from "react";
import { preLoaderAnim } from "../Animation";

const Preloader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
      <div className="preloader-container">
        <span>Welcome</span>
        <span>to</span>
        <span>Chat</span>
      </div>
    </div>
  );
};

export default Preloader;

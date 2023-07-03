import React from "react";
import TimeAgo from "timeago-react"; // var TimeAgo = require('timeago-react');

const RoomItems = () => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">Room name</h3>
        <span>
          <TimeAgo
            datetime={new Date()}
            className="font-normal text-black-45"
          />
        </span>
      </div>
      <div className="d-flex align-items-center text-black-70">
        <span>No message yet...</span>
      </div>
    </div>
  );
};

export default RoomItems;

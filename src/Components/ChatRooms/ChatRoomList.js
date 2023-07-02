import React from "react";
import { Nav } from "rsuite";
import RoomItems from "./RoomItems";

const ChatRoomList = () => {
  return (
    <Nav
      vertical
      appearance="subtle"
      reversed
      className="overflow-y-scroll custom-scroll"
    >
      <Nav.Item>
        <RoomItems />
      </Nav.Item>
    </Nav>
  );
};

export default ChatRoomList;

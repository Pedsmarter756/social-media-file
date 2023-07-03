import React from "react";
import { Nav } from "rsuite";
import RoomItems from "./RoomItems";

const ChatRoomList = ({ aboveElheight }) => {
  return (
    <Nav
      vertical
      appearance="subtle"
      reversed
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElheight}px)`,
      }}
    >
      <Nav.Item>
        <RoomItems />
      </Nav.Item>
    </Nav>
  );
};

export default ChatRoomList;

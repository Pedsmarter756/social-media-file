import React from "react";
import DashboardToggle from "./Dashboard/DashboardToggle";
import CreateRoomBtnModal from "./CreateRoomBtnModal";
import { Divider } from "rsuite";
import ChatRoomList from "./ChatRooms/ChatRoomList";

const Sidebar = () => {
  return (
    <div className="h-100 pt-2">
      <div>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join the Conversation</Divider>
        <div>
          <ChatRoomList />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

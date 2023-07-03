import React, { useEffect, useRef, useState } from "react";
import DashboardToggle from "./Dashboard/DashboardToggle";
import CreateRoomBtnModal from "./CreateRoomBtnModal";
import { Divider } from "rsuite";
import ChatRoomList from "./ChatRooms/ChatRoomList";

const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height, setheight] = useState(0);
  useEffect(() => {
    if (topSidebarRef.current) {
      setheight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);
  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join the Conversation</Divider>
        <div>
          <ChatRoomList aboveElheight={height} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

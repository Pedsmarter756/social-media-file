import React from "react";
import DashboardToggle from "./Dashboard/DashboardToggle";

const Sidebar = () => {
  return (
    <div className="h-100 pt-2">
      <div>
        <DashboardToggle />
      </div>
    </div>
  );
};

export default Sidebar;

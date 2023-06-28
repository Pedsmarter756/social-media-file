import React from "react";
import { Button, Icon, Drawer } from "rsuite";
import { useMediaQuery, useModalState } from "../../misc/custom-hooks";
import Dashboard from ".";
const DashboardToggle = () => {
  const isMobile = useMediaQuery("(max-width: 992px)");
  const { isopen, open, close } = useModalState();
  return (
    <div>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer full={isMobile} show={isopen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </div>
  );
};

export default DashboardToggle;

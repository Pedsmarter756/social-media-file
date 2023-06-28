import React from "react";
import { Button, Icon, Drawer } from "rsuite";
import { useModalState } from "../../misc/custom-hooks";
import Dashboard from ".";
const DashboardToggle = () => {
  const { isopen, open, close } = useModalState();
  return (
    <div>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer show={isopen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </div>
  );
};

export default DashboardToggle;

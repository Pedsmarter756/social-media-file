import React, { useCallback } from "react";
import { auth } from "../../misc/firebase";
import { Button, Icon, Drawer, Alert } from "rsuite";
import { useMediaQuery, useModalState } from "../../misc/custom-hooks";
import Dashboard from ".";
const DashboardToggle = () => {
  // const isMobile = useMediaQuery("(max-width: 992px)");
  const { isopen, open, close } = useModalState();

  const onsignout = useCallback(() => {
    auth.signOut();
    Alert.info("Sign out", 4000);
    close();
  }, [close]);

  return (
    <div>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer show={isopen} onHide={close} placement="left">
        <Dashboard onsignout={onsignout} />
      </Drawer>
    </div>
  );
};

export default DashboardToggle;

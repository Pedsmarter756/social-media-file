import React, { useCallback } from "react";
import { auth, database } from "../../misc/firebase";
import { Button, Icon, Drawer, Alert } from "rsuite";
import { useMediaQuery, useModalState } from "../../misc/custom-hooks";
import Dashboard from ".";
import { isOfflineForDatabase } from "../../context/profile.context";

const DashboardToggle = () => {
  const isMobile = useMediaQuery("(max-width: 992px)");
  const { isopen, open, close } = useModalState();

  const onsignout = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        Alert.info("Sign out", 4000);
        close();
      })
      .catch((err) => {
        Alert.error(err.message, 4000);
      });
  }, [close]);

  return (
    <div>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer full={isMobile} show={isopen} onHide={close} placement="left">
        <Dashboard onsignout={onsignout} />
      </Drawer>
    </div>
  );
};

export default DashboardToggle;

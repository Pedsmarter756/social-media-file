import React from "react";
import { Alert, Button, Divider, Drawer } from "rsuite";
import { useProfile } from "../../context/profile.context";
import EditableInput from "./EditableInput";
import { database } from "../../misc/firebase";

const Dashboard = ({ onsignout }) => {
  const { profile } = useProfile();

  const onSave = async (newData) => {
    const usereditname = database.ref(`/profiles/${profile.uid}`).child("name");

    try {
      await usereditname.set(newData);
      Alert.success("Username has been updated", 4000);
    } catch (error) {
      Alert(error.message, 4000);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <Divider />
        <EditableInput
          name="username"
          intialValue={profile.name}
          label={<h6 className="mb-2">Username</h6>}
          onSave={onSave}
        />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onsignout}>
          Sign out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;

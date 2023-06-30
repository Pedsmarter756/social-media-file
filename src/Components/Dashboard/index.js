import React from "react";
import { Button, Divider, Drawer } from "rsuite";
import { useProfile } from "../../context/profile.context";
import EditableInput from "./EditableInput";

const Dashboard = ({ onsignout }) => {
  const { profile } = useProfile();

  const onSave = (newData) => {
    console.log(newData);
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
          name="nickname"
          intialValue={profile.name}
          label={<h6 className="mb-2">Nickname</h6>}
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

import React from "react";
import { useMediaQuery, useModalState } from "../../../misc/custom-hooks";
import { Alert, Button, Drawer } from "rsuite";
import { useCurrentRoom } from "../../../context/current-rooms.context";
import EditableInput from "../../Dashboard/EditableInput";
import { database } from "../../../misc/firebase";
import { useParams } from "react-router";

const EditRoomsBtnDrawer = () => {
  const { chatId } = useParams();
  const { isopen, close, open } = useModalState();
  const isMobile = useMediaQuery("(max-width: 992px)");
  const name = useCurrentRoom((value) => value.name);
  const description = useCurrentRoom((value) => value.description);

  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        Alert.success("Successfully", 4000);
      })
      .catch((error) => {
        Alert.error(error.message, 4000);
      });
  };
  const onNameSave = (newName) => {
    updateData("name", newName);
  };

  const onDescriptionSave = (newDesc) => {
    updateData("description", newDesc);
  };
  return (
    <div>
      <Button className="br-circle" size="sm" color="red" onClick={open}>
        A
      </Button>

      <Drawer full={isMobile} show={isopen} onHide={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            intialValue={name}
            onSave={onNameSave}
            label={<h4 className="mb-2">Name</h4>}
            emptyMsg="Name can not be empty"
          />
          <EditableInput
            componentClass="textarea"
            rows={5}
            onSave={onDescriptionSave}
            intialValue={description}
            emptyMsg="Description can not be empty"
            wrapperclasses="mt-3"
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default EditRoomsBtnDrawer;

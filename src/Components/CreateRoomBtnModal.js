import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from "rsuite";
import { useModalState } from "../misc/custom-hooks";
import firebase from "firebase/compat/app";
import { database } from "../misc/firebase";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Chat name is Required"),
  description: StringType().isRequired("Description is required"),
});

const INITIAL_FORM = {
  name: "",
  description: "",
};
const CreateRoomBtnModal = () => {
  const { isopen, close, open } = useModalState();
  const [isLoading, setIsLoading] = useState(false);
  const [formValue, setformValue] = useState(INITIAL_FORM);
  const formRef = useRef();

  const onFormChange = useCallback((value) => {
    setformValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return Alert.error("Error");
    }

    setIsLoading(true);
    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
    // const newRoomData = {
    //   ...(Array.isArray(formValue) ? [...formValue] : formValue),
    //   createdAt: firebase.database.ServerValue.TIMESTAMP,
    // };

    try {
      await database.ref("rooms").push(newRoomData);

      setIsLoading(false);
      setformValue(INITIAL_FORM);
      close();
      Alert.info(`${formValue.name} has been created`, 4000);
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message, 4000);
    }
  };

  return (
    <div className="mt-1">
      <Button block color="green" onClick={open}>
        <Icon icon="creative" /> Create new chat rooms
      </Button>
      <Modal show={isopen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            formValue={formValue}
            onChange={onFormChange}
            ref={formRef}
            model={model}
          >
            <FormGroup>
              <ControlLabel>Room name</ControlLabel>
              <FormControl name="name" placeholder="Enter chat room name..." />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter room description..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            disabled={isLoading}
            onClick={onSubmit}
          >
            Create new chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;

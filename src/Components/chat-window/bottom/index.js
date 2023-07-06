import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { Icon, InputGroup, Input, Alert } from "rsuite";
import firebase from "firebase/compat/app";
import { useProfile } from "../../../context/profile.context";
import { useParams } from "react-router";
import { database } from "../../../misc/firebase";

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  };
}

const Bottom = () => {
  const [input, setInput] = useState(" ");
  const { profile } = useProfile();
  const { chatId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    //if empty
    if (input.trim() === "") {
      return;
    }

    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;
    const updates = {};
    const messageId = database.ref("messages").push().key;
    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
    };
    setIsLoading(true);
    try {
      await database.ref().update(updates);
      setInput("");
      setIsLoading(false);
    } catch (error) {
      Alert.error(error.message, 4000);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Write a new message here..."
          value={input}
          onChange={onInputChange}
          id="messageinput"
        />
        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={onSendClick}
          disabled={isLoading}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default Bottom;

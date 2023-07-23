import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { database } from "../../../misc/firebase";
import { transformToArrWithid } from "../../../misc/helper";
import MessageItem from "./MessageItem";
import { useCallback } from "react";
import { Alert } from "rsuite";

const Message = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messageRef = database.ref("messages");
    messageRef
      .orderByChild("roomId")
      .equalTo(chatId)
      .on("value", (snap) => {
        const data = transformToArrWithid(snap.val());

        setMessages(data);
      });

    return () => {
      messageRef.off("value");
    };
  }, [chatId]);

  const handleAdmin = useCallback(
    async (uid) => {
      const adminRef = database.ref(`/rooms/${chatId}/admins`);

      let alertMsg;
      await adminRef.transaction((admins) => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = "Admin Permission removed";
          } else {
            admins[uid] = true;
            alertMsg = "Admin permission granted";
          }
        }

        return admins;
      });

      Alert.info(alertMsg, 4000);
    },
    [chatId]
  );
  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No Messages Yet</li>}
      {canShowMessages &&
        messages.map((msg) => (
          <MessageItem key={msg.id} messages={msg} handleAdmin={handleAdmin} />
        ))}
    </ul>
  );
};

export default Message;

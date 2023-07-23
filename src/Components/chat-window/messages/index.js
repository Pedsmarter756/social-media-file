import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { auth, database } from "../../../misc/firebase";
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

  const handleLikes = useCallback(async (msgId) => {
    const { uid } = auth.currentUser;
    const messageRef = database.ref(`/messages/${msgId}`);

    let alertMsg;
    await messageRef.transaction((msg) => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          alertMsg = "Like removed";
        } else {
          msg.likeCount += 1;
          if (!msg.likes) {
            msg.likes = {};
          }

          msg.likes[uid] = true;
          alertMsg = "Like Added";
        }
      }

      return msg;
    });

    Alert.info(alertMsg, 4000);
  });

  const handleDelete = useCallback(
    async (msgId) => {
      if (!window.confirm("Delete this message")) {
        return;
      }

      const isLast = messages[messages.length - 1].id === msgId;
      const updates = {};

      updates[`/messages/${msgId}`] = null;

      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id,
        };
      }

      if (isLast && messages.length === 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }

      try {
        await database.ref().update(updates);
        Alert.info("Message has been deleted");
      } catch (error) {
        Alert.error(error.message, 4000);
      }
    },

    [chatId, messages]
  );

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>No Messages Yet</li>}
      {canShowMessages &&
        messages.map((msg) => (
          <MessageItem
            key={msg.id}
            messages={msg}
            handleLikes={handleLikes}
            handleAdmin={handleAdmin}
            handleDelete={handleDelete}
          />
        ))}
    </ul>
  );
};

export default Message;

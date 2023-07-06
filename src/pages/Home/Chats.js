import React from "react";
import ChatTop from "../../Components/chat-window/top";
import ChatMessage from "../../Components/chat-window/messages";
import ChatBottom from "../../Components/chat-window/bottom";
import { useParams } from "react-router";
import { useRooms } from "../../context/rooms.context";
import { Loader } from "rsuite";
import { CurrentRoomProvider } from "../../context/current-rooms.context";

const Chats = () => {
  const { chatId } = useParams();

  const rooms = useRooms();

  if (!rooms) {
    return <Loader center verticle size="md" content="Loading" speed="slow" />;
  }

  const currentRoom = rooms.find((room) => room.id === chatId);

  if (!currentRoom) {
    return <h5 className="text-center mt-page">chat {chatId} not found </h5>;
  }

  const { name, description } = currentRoom;
  const currentRoomData = {
    name,
    description,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <ChatMessage />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chats;

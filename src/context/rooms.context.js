import React, { createContext, useEffect, useState } from "react";
import { database } from "../misc/firebase";
import { transformToArrWithid } from "../misc/helper";
import { useContext } from "react";

const RoomsContext = createContext();

export const RoomsProvider = ({ children }) => {
  const [rooms, setrooms] = useState(null);

  useEffect(() => {
    const roomListRef = database.ref("rooms");

    roomListRef.on("value", (snap) => {
      //   console.log("snap.val()", snap.val());
      const data = transformToArrWithid(snap.val());
      //object convert to array
      //   console.log(data);
      setrooms(data);
    });

    return () => {
      roomListRef.off();
    };
  });

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);

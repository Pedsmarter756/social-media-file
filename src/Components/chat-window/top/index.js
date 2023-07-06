import React, { memo } from "react";
import { useCurrentRoom } from "../../../context/current-rooms.context";

const Top = () => {
  const name = useCurrentRoom((value) => value.name);

  return <div>{name}</div>;
};

export default memo(Top);

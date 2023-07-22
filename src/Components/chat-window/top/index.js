import React, { memo } from "react";
import { useCurrentRoom } from "../../../context/current-rooms.context";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../../../misc/custom-hooks";
import { ButtonToolbar, Icon } from "rsuite";
import RoomInfoBtnModel from "./RoomInfoBtnModel";
import EditRoomsBtnDrawer from "./EditRoomsBtnDrawer";

const Top = () => {
  const name = useCurrentRoom((value) => value.name);
  const isMobile = useMediaQuery("(max-width : 992px)");
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Icon
            componentClass={Link}
            to="/"
            icon="arrow-circle-left"
            size="2x"
            className={
              isMobile
                ? "d-inline-block p-0 mr-2 text-blue link-unstyled"
                : "d-none"
            }
          />
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">
          <EditRoomsBtnDrawer />
        </ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span>todo</span>
        <RoomInfoBtnModel />
      </div>
    </div>
  );
};

export default memo(Top);

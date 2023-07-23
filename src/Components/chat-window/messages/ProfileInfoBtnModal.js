import React from "react";
import { useModalState } from "../../../misc/custom-hooks";
import { Button, Modal } from "rsuite";
import ProfileAvatar from "../../Dashboard/ProfileAvatar";

const ProfileInfoBtnModal = ({ profile, children }) => {
  const { isopen, close, open } = useModalState();
  const { name, avatar, createdAt } = profile;
  const shortName = profile.name.split(" ")[0];
  const memberSince = new Date(createdAt).toLocaleDateString();
  return (
    <div>
      <Button appearance="link" className="p-0 ml-1 text-white" onClick={open}>
        {shortName}
      </Button>
      <Modal show={isopen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{shortName} profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProfileAvatar
            src={avatar}
            name={name}
            className="width-200 height-200 img-fullsize font-huge"
          />

          <h4 className="mt-2">{name}</h4>
          <p>Member Since {memberSince}</p>
        </Modal.Body>
        <Modal.Footer>
          {children}
          <Button block primary onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileInfoBtnModal;

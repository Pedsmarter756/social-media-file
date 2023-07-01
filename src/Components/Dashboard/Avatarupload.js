import React, { useState } from "react";
import { useModalState } from "../../misc/custom-hooks";
import { Alert, Button, Modal } from "rsuite";
import AvatarEditor from "react-avatar-editor";

const fileInputtype = ".png, .jpeg, jpg";
const acceptFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValidType = (file) => acceptFileTypes.includes(file.type);
const Avatarupload = () => {
  const { open, close, isopen } = useModalState();
  const [img, setimg] = useState(null);

  const onFileinputChange = (ev) => {
    const currFiles = ev.target.files;
    if (currFiles.length === 1) {
      const file = currFiles[0];

      if (isValidType(file)) {
        setimg(file);
        open();
      } else {
        Alert.warning(` Wrong File Type ${file.type}`, 4000);
      }
    }
  };
  return (
    <div className="mt-3 text-center">
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded"
        >
          Select new avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputtype}
            onChange={onFileinputChange}
          />
        </label>
        <Modal show={isopen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and Upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  image={img}
                  width={200}
                  height={200}
                  border={50}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button block appearance="ghost">
              Upload new Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Avatarupload;

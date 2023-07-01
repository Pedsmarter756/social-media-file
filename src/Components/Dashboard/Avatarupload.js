import React, { useState } from "react";
import { useModalState } from "../../misc/custom-hooks";
import { Alert, Button, Modal } from "rsuite";
import AvatarEditor from "react-avatar-editor";
import { useRef } from "react";
import { database, storage } from "../../misc/firebase";
import { useProfile } from "../../context/profile.context";
import ProfileAvatar from "./ProfileAvatar";
const fileInputtype = ".png, .jpeg, jpg";
const acceptFileTypes = ["image/png", "image/jpeg", "image/pjpeg"];
const isValidType = (file) => acceptFileTypes.includes(file.type);

const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("File process error"));
      }
    });
  });
};
const Avatarupload = () => {
  const { open, close, isopen } = useModalState();
  const [img, setimg] = useState(null);
  const avatarEditorRef = useRef();
  const { profile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);

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

  const onuploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    try {
      setIsLoading(true);
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child("avatar");

      //specify meta data cache image in browser
      const uploadavatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadavatarResult.ref.getDownloadURL();

      const userAvatarRef = database
        .ref(`/profiles/${profile.uid}`)
        .child("avatar");

      userAvatarRef.set(downloadUrl);
      setIsLoading(false);
      Alert.info("Avatar has been uploaded", 4000);
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message, 4000);
    }
  };
  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        circle
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize"
      />
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
                  ref={avatarEditorRef}
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
            <Button
              block
              appearance="ghost"
              onClick={onuploadClick}
              disabled={isLoading}
            >
              Upload new Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Avatarupload;

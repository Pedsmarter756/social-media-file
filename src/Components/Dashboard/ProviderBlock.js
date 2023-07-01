import React, { useState } from "react";
import { Alert, Button, Icon, Tag } from "rsuite";
import { auth } from "../../misc/firebase";
import firebase from "firebase/compat/app";

const ProviderBlock = () => {
  //   console.log(auth.currentUser);

  const [isconnected, setisconnectec] = useState({
    "google.com": auth.currentUser.providerData.some(
      (data) => data.providerId === "google.com"
    ),
    "facebook.com": auth.currentUser.providerData.some(
      (some) => some.data === "facebook.com"
    ),
  });

  // p is previous state
  const updateIsconnected = (providerId, value) => {
    setisconnectec((p) => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unlink = async (providerId) => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You can not disconnected from ${providerId}`);
      }
      await auth.currentUser.unlink(providerId);
      updateIsconnected(providerId, false);
      Alert.info(`Disconnected from ${providerId}`, 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const unlinkgoogle = () => {
    unlink("google.com");
  };

  const unlinkfacebook = () => {
    unlink("facebook.com");
  };

  const link = async (provider) => {
    try {
      await auth.currentUser.linkWithPopup(provider);

      Alert.info("Successful link", 4000);
      updateIsconnected(provider.providerId, true);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  const googlelink = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };

  const facebooklink = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };

  return (
    <div className="mt-1">
      {isconnected["google.com"] && (
        <Tag color="green" closable onClose={unlinkgoogle}>
          <Icon icon="google" />
          Connected
        </Tag>
      )}
      {isconnected["facebook.com"] && (
        <Tag color="blue" closable onClose={unlinkfacebook}>
          <Icon icon="facebook" />
          Connected
        </Tag>
      )}

      <div className="mt-2">
        {!isconnected["google.com"] && (
          <Button block color="green" onClick={googlelink}>
            <Icon icon="google" />
            Link to Google
          </Button>
        )}

        {!isconnected["facebook.com"] && (
          <Button block color="blue" onClick={facebooklink}>
            <Icon icon="facebook" />
            Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;

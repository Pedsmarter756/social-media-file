import React, { useState } from "react";
import { Button, Icon, Tag } from "rsuite";
import { auth } from "../../misc/firebase";

const ProviderBlock = () => {
  console.log(auth.currentUser);

  const [isconnected, setisconnectec] = useState({
    "google.com": auth.currentUser.providerData.some(
      (data) => data.providerId === "google.com"
    ),
    "facebook.com": auth.currentUser.providerData.some(
      (some) => some.data === "facebook.com"
    ),
  });
  return (
    <div className="mt-1">
      {isconnected["google.com"] && (
        <Tag color="green" closable>
          <Icon icon="google" />
          Connected
        </Tag>
      )}
      {isconnected["facebook.com"] && (
        <Tag color="blue" closable>
          <Icon icon="facebook" />
          Connected
        </Tag>
      )}

      <div className="mt-2">
        {!isconnected["google.com"] && (
          <Button block color="green">
            <Icon icon="google" />
            Link to Google
          </Button>
        )}

        {!isconnected["facebook.com"] && (
          <Button block color="blue">
            <Icon icon="facebook" />
            Link to Facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;

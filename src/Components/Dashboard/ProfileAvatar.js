import React from "react";
import { Avatar } from "rsuite";
import { getNameIntials } from "../../misc/helper";
const ProfileAvatar = ({ name, ...avatarProps }) => {
  return <Avatar {...avatarProps}>{getNameIntials(name)}</Avatar>;
};

export default ProfileAvatar;

import React from "react";
import TimeAgo from "timeago-react";
import ProfileAvatar from "../../Dashboard/ProfileAvatar";
import ProfileInfoBtnModal from "./ProfileInfoBtnModal";
import PresenceDots from "../../ChatRooms/PresenceDots";
import { Button } from "rsuite";
import { useCurrentRoom } from "../../../context/current-rooms.context";
import { auth } from "../../../misc/firebase";
import { memo } from "react";
import { useHover, useMediaQuery } from "@uidotdev/usehooks";
import IconBtnControl from "./IconBtnControl";

const MessageItem = ({ messages, handleAdmin, handleLikes }) => {
  const { author, createdAt, text, likes, likeCount } = messages;
  const isAdmin = useCurrentRoom((v) => v.isAdmin);
  const admins = useCurrentRoom((v) => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.id);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  const [reff, hovering] = useHover();

  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);
  const isMobile = useMediaQuery("(max-width:992px");
  const canShowIcons = isMobile || hovering;
  return (
    <li
      className={`padded mb-1 cursor-pointer ${hovering ? "bg-black-02" : ""}`}
      ref={reff}
    >
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDots uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        <ProfileInfoBtnModal profile={author}>
          {canGrantAdmin && (
            <Button
              onClick={() => {
                handleAdmin(author.uid);
              }}
              block
              color="blue"
            >
              {isMsgAuthorAdmin
                ? "Remove admin permission"
                : "Give admin in this room"}
            </Button>
          )}
        </ProfileInfoBtnModal>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />
        <IconBtnControl
          {...(isLiked ? { color: "red" } : {})}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="Like this message"
          onClick={() => handleLikes(messages.id)}
          badgeContent={likeCount}
        />
      </div>
      <div>
        <span className="word-break-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItem);

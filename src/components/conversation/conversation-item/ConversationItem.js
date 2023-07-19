// import React from "react";
import classNames from "classnames";

import "./ConversationItem.scss";
import moment from "moment";
import ConversationAvatar from "../conversation-avatar/ConversationAvatar";

const ConversationItem = (props) => {
  const { user, onClick } = props;

  const className = classNames("conversation");
  return (
    <div onClick={() => onClick(user)} className={className}>

      {user?.contact?.icon == null ? (
        <ConversationAvatar letter={user?.contact?.name?.charAt(0)} />
      ) : (
        <img src={user?.contact?.icon} alt="user" />
      )}

      <div className="title-text">
        <div>
          {user?.contact_type === "User"
            ? user?.contact?.name
            : user?.contact?.members?.map((member) => member.name + ",")}
          <div className="conversation-message">{user?.latest_chat?.message}</div>

        </div>
      </div>

      <div className="created-date">
        {moment(user?.contact?.created_at).format("DD-MM-YYYY")}
      </div>
    </div>
  );
};

export const SearchItem = (props) => {
  const { user, onClick } = props;
  const userImg = user?.contact?.icon;


  const className = classNames("conversation");
  return (
    <div onClick={() => onClick(user)} className={className}>
      {userImg == 'null' ? (
        <ConversationAvatar letter={user?.name?.charAt(0)} />
      ) : (
        <img src={user?.profile_image} alt="user" />
      )}

      <div className="title-text">
        <div>
          {user?.name}</div>
      </div>

    </div>
  );
};
export default ConversationItem;

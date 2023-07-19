import React from "react";
import "../conversation-item/ConversationItem.scss";
const ConversationAvatar = ({ letter }) => {
  return (
    <div className="conversation_avatar">
      <div>{letter}</div>
    </div>
  );
};

export default ConversationAvatar;

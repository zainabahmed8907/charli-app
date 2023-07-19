import React from "react";

import { SearchOutlined, MoreOutlined } from "@ant-design/icons";

import "./ChatTitle.scss";
import ConversationAvatar from "../conversation/conversation-avatar/ConversationAvatar";

const ChatTitle = ({ chatUser, chatUserImg, lastSeen }) => {

  console.log(chatUser, chatUserImg);
  return (
    <div id="chat-title">
      <div className="d-flex align-items-center ">


        {chatUserImg == 'null' ? (
          <ConversationAvatar letter={chatUser?.charAt(0)} />
        ) : (
          <img src={chatUserImg} alt="user" />
        )}

        <span className="title" style={{ marginLeft: "20px" }}>{chatUser}</span>
      </div>

      <div>
        <p style={{ textAlign: "center" }}>{lastSeen}</p>
      </div>

      <div className="d-flex align-items-center">
        <SearchOutlined style={{ color: "#201F27", fontSize: "20px" }} />
        <MoreOutlined style={{ color: "black", fontSize: "20px" }} />
      </div>
    </div>
  );
};
export default ChatTitle;

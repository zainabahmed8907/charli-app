import React from "react";
import classNames from "classnames";
import {
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./Message.scss";
import { List, Popover } from "antd";

var images = [
  { id: "like", img: "http://i.imgur.com/LwCYmcM.gif" },
  { id: "love", img: "http://i.imgur.com/k5jMsaH.gif" },
  { id: "haha", img: "http://i.imgur.com/f93vCxM.gif" },
  { id: "yay", img: "http://i.imgur.com/a44ke8c.gif" },
  { id: "wow", img: "http://i.imgur.com/9xTkN93.gif" },
  { id: "sad", img: "http://i.imgur.com/tFOrN5d.gif" },
  { id: "angry", img: "http://i.imgur.com/1MgcQg0.gif" },
];

const data1 = [
  {
    icon: () => <CopyOutlined />,
    text: "Reply",
  },
  {
    icon: () => <CopyOutlined />,
    text: "Thread Reply",
  },
  {
    icon: () => <CopyOutlined />,
    text: "Copy Message",
  },
  {
    icon: () => <EditOutlined />,
    text: "Edit Message",
  },
  {
    icon: () => <UserOutlined />,
    text: "Block User",
  },
  {
    icon: () => <DeleteOutlined />,
    text: "Delete Message",
  },
];

const Message = ({ isMyMessage, message }) => {
  const [selectedMessageId, setSelectedMessageId] = React.useState(null);
  const messageClass = classNames("message-row", {
    "you-message": isMyMessage,
    "other-message": !isMyMessage,
  });

  const imageThumbnail = isMyMessage ? null : (
    <img src={message.imageUrl} alt={message.imageAlt} />
  );

  const handleClick = React.useCallback((event, info) => {
    // prevent context menu from opening on right-click
    event.preventDefault();

    console.log({ event, info });

    let message;

    // synthetic event
    switch (event.type) {
      case "click":
        message = `Left click (synthetic event)`;
        break;
      case "contextmenu":
        setSelectedMessageId(info.messageId);
        break;
      default:
    }

    // native event

    if (message) {
      console.log(`Click detected:\n${message}\n`);
    }
  }, []);

  return (
    <div className={messageClass}>
      <div className="message-content">
        {imageThumbnail}
        <div className="message-text">
          <span
            tabindex="0"
            onClick={(e) => handleClick(e, message)}
            onContextMenu={(e) => handleClick(e, message)}
            onBlur={() => {
              setSelectedMessageId(null);
            }}
          >
            {message.messageText}
          </span>
          {selectedMessageId && (
            <div
              style={{
                position: "absolute",
                ...(message?.isMyMessage ? { right: 0 } : { right: 0 }),
              }}
            >
              <List
                size="small"
                style={{ background: "#FCFCFC", width: "170px" }}
                bordered
                dataSource={data1}
                renderItem={(item) => (
                  <List.Item>
                    <span className="mr-1">{item?.icon()}</span> {item.text}
                  </List.Item>
                )}
              />
            </div>
          )}
        </div>
        {message?.isMyMessage && (
          <img className="pl-2" src={message.imageUrl} alt={message.imageAlt} />
        )}
      </div>
    </div>
  );
};

export default Message;

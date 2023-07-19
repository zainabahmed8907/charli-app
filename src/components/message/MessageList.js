import React, {useEffect} from "react";
import {
  conversations,
  messageDetailss,
} from "../../pages/screen/Chat/conversion";
// import {connect} from "react-redux";

// import {messagesRequested} from "../../store/actions";
import Message from "./Message";
import "./MessageList.scss";
import ChatForm from "./../chat-form/ChatForm";

const MessageList = ({
  conversationId,
  getMessagesForConversation,
  loadMessages,
  selectedConversation,
}) => {
  const messageDetails = conversations[0];
  console.log({messageDetails});
  const messages = messageDetails ? messageDetails.messages : null;
  let messageItems = null;

  //   useEffect(() => {
  //     if (!messageDetails) {
  //       loadMessages(conversationId, null);
  //     }
  //   }, [messageDetails, loadMessages, conversationId]);
  console.log({messages, messageDetails});
  if (messages && messages.length > 0) {
    messageItems = messages.map((message, index) => {
      return (
        <>
          <Message
            key={index}
            isMyMessage={message.isMyMessage}
            message={message}
          />
        </>
      );
    });
  }

  return (
    <div style={{position: "relative"}}>
      <div id='chat-message-list'>{messageItems}</div>
      <ChatForm
        selectedConversation={selectedConversation}
        onMessageSubmitted={() => console.log("")}
      />
    </div>
  );
};

export default MessageList;

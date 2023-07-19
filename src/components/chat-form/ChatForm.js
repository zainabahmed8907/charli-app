import {Button} from "antd";
import React, {useState} from "react";

import FormButton from "../controls/buttons/FormButton";
import AttachmentIcon from "../controls/icons/attachment-icon/AttachmentIcon";

import "./ChatForm.scss";

const isMessageEmpty = (textMessage) => {
  return adjustTextMessage(textMessage).length === 0;
};

const adjustTextMessage = (textMessage) => {
  return textMessage.trim();
};

const ChatForm = ({selectedConversation, onMessageSubmitted}) => {
  const [textMessage, setTextMessage] = useState("");
  const disableButton = isMessageEmpty(textMessage);
  let formContents = null;
  let handleFormSubmit = null;

  if (selectedConversation) {
    formContents = (
      <>
        <div className='chat-input-container'>
          <div className='d-flex align-items-center' title='Add Attachment'>
            <AttachmentIcon />
          </div>
          <input
            type='text'
            placeholder='Type your message or use speech to text'
            value={textMessage}
            onChange={(e) => {
              setTextMessage(e.target.value);
            }}
          />
        </div>
        {/* <FormButton disabled={disableButton}>Send</FormButton> */}
        <Button className='' type='primary'>
          Send
        </Button>
      </>
    );

    handleFormSubmit = (e) => {
      e.preventDefault();

      if (!isMessageEmpty(textMessage)) {
        onMessageSubmitted(textMessage);
        setTextMessage("");
      }
    };
  }

  return (
    <form id='chat-form' onSubmit={handleFormSubmit}>
      {formContents}
    </form>
  );
};

export default ChatForm;

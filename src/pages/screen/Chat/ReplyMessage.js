import { Avatar, Space } from "antd";
import moment from "moment";
import React from "react";

const ReplyMessage = ({ con, chatUserImg, replyText }) => {
  return (
    <div>
      <div className="sender-images">
        {con.attachments &&
        Object.keys(con.attachments).length > 0 &&
        Object.keys(con.attachments).length == 1 ? (
          Object.keys(con?.attachments).map((item, index) => {
            return <img src={con?.attachments[item]?.preview_url} alt="" />;
          })
        ) : (
          <div className="grid">
            {Object.keys(con?.attachments).map((item, index) => {
              return (
                <figure className={`gallery_item${index}`}>
                  <img
                    src={con?.attachments[item]?.preview_url}
                    alt=""
                    className="gallery_img"
                    width="200"
                    height="200"
                    style={{ marginLeft: "200px" }}
                  />
                </figure>
              );
            })}
          </div>
        )}
      </div>
      <Space>
        <div className="chat_msg">
          <div className="othersAvatar">
            <Avatar src={chatUserImg} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "250px",
            }}
          >
            <div>
              <p className="receiver">{con?.from_name}</p>
              <p className="replyTo">{replyText}</p>
              <p className="messageStyle"> {con?.message}</p>
              <p className="message_time text-muted">
                {moment(con?.message_time).format("DD-MM-YYYY")}
              </p>
            </div>
            <div
              className="reaction-icon"
              style={{
                alignSelf: "flex-start",
                position: "absolute",
                left: "190px",
              }}
            ></div>
          </div>
        </div>
      </Space>
    </div>
  );
};

export default ReplyMessage;

import { Avatar, Space, Dropdown, Menu, Popover, Collapse, theme } from "antd";
import moment from "moment";
import React, { useState } from "react";
import {
  DeleteOutlined,
  UserDeleteOutlined,
  LikeFilled,
  HeartFilled,
  DislikeFilled,
  QuestionOutlined,
} from "@ant-design/icons";
import Reply from "../../../assets/images/Union.png";
import Copy from "../../../assets/images/Shape.png";
import Edit from "../../../assets/images/Edit.png";
import Thread from "../../../assets/images/thread.png";
import axios from "axios";
import ThumbUp from "../../../assets/images/Thumbs Up.png";
import ThumbsDown from "../../../assets/images/Thumbs Down.png";
import Like from "../../../assets/images/Like.png";
import Ques from "../../../assets/images/ques.png";
import Default from "../../../assets/images/newbook.png";
import ConversationAvatar from "../../../components/conversation/conversation-avatar/ConversationAvatar";


const reactions = [
  {
    image: Like,
    alt: "like",
    name: "hearts",
  },
  {
    image: ThumbUp,
    alt: "thumbsup",
    name: "thumbs_up",
  },
  {
    image: ThumbsDown,
    alt: "thumbsDown",
    name: "thumbs_down",
  },
  {
    image: Ques,
    alt: "ques",
    name: "question_marks",
  },
];
const ReceiveMessage = ({
  con,
  visibleID,
  deleteMessage,
  chatUserImg,
  replyMessage,
  inputRef,
  currentChatId,
  onmodalAction,
  _onEdit,
  chatUser,
}) => {
  const [reactionID, setReactionID] = useState(0);

  const [showReplies, setShowReplies] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const close = () => {
    setPopupVisible(false);
  };

  const open = (newOpen) => {
    setPopupVisible(newOpen);
  };
  const addreaction = async (reactionData) => {
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.post(
        `https://charliiapp.clickysoft.net/api/v1/chats/reaction`,
        reactionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("react API data", data);
      if (data) {
        return data;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const feature = [
    {
      name: 'Timeline',
      title: 'name',
      data: con?.timeline ?? false,
    },
    {
      name: 'Plot',
      title: 'plot_planner_title',
      data: con?.plot_planner ?? false,
    },
    {
      name: 'Outline',
      title: 'outline_name',
      data: con?.outline ?? false,
    },
    {
      name: 'Brainstorm',
      title: 'brainstorm_name',
      data: con?.brainstorm ?? false,
    },
    {
      name: 'Series',
      title: 'series_name',
      data: con?.series ?? false,
    },
    {
      name: 'Books',
      title: 'book_name',
      data: con?.books ?? false,
    },
  ];
  const onChatreaction = async (reaction, chat_id) => {
    try {
      let payload = {
        reaction: reaction,
        chat_id: chat_id,
      };
      const { data } = await addreaction(payload);
      let obj = {};
      for (var key in reactions) {
        if (key == reaction - 1) {
          obj[reactions[reaction - 1].name] = 1;
        } else {
          obj[reactions[key].name] = 0;
        }
      }
      _onEdit(obj, chat_id);
    } catch (error) {
      console.debug(error);
    }
  };
  const data = { reaction: reactionID, chat_id: con?.id };
  const Content = ({ hide }) => {
    return (
      <div className="reaction-card">
        <ul>
          {reactions.map((r, index) => (
            <li key={index}>
              <img
                src={r?.image}
                alt={r?.alt}
                onClick={() => {
                  setReactionID(index + 1);
                  onChatreaction(index + 1, data?.chat_id);
                  hide();
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  //focus input field
  const handleRef = () => {
    inputRef.current.focus();
  };

  const menu = (
    <Menu onClick={(e) => onmodalAction(e, con)} className="sender_menu">
      <Menu.Item
        key="reply"
        onClick={() => {
          handleRef();
          close();
        }}
        style={{ borderBottom: "1px solid #cfcfcf", padding: "10px" }}

      >
        {" "}
        <p>
          <img src={Reply} alt="" className="chatDropDownIcon" />
          <span>Reply</span>{" "}
        </p>
      </Menu.Item>
      <Menu.Item
        key="thread_reply"
        style={{ borderBottom: "1px solid #cfcfcf", padding: "10px" }}
        onClick={close}
      >
        <p>
          <img src={Thread} alt="" className="chatDropDownIcon" />
          <span>Thread Reply</span>{" "}
        </p>
      </Menu.Item>
      <Menu.Item
        key="copy"
        style={{ borderBottom: "1px solid #cfcfcf", padding: "10px" }}
        onClick={close}

      >
        {" "}
        <p>
          <img src={Copy} alt="" className="chatDropDownIcon" />
          <span>Copy Message</span>{" "}
        </p>
      </Menu.Item>
     
      <Menu.Item
        key="block_user"
        style={{ borderBottom: "1px solid #cfcfcf", padding: "10px" }}
        onClick={close}
      >
        <p>
          <UserDeleteOutlined className="chatDropDownIcon" />
          <span>Block User</span>{" "}
        </p>
      </Menu.Item>
      <Menu.Item
        key="delete_message"
        style={{ borderBottom: "1px solid #cfcfcf", padding: "10px" }}
        onClick={close}
      >
        <p>
          <DeleteOutlined className="deleteDropDownIcon" />
          <span style={{ color: "red" }}>Delete Message</span>{" "}
        </p>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        overlayClassName="root"

      >
        <Popover
          content={<Content hide={close} />}
          trigger="click"
          placement="topLeft"
          id="react-popover"
          overlayStyle={{ position: "absolute", top: "20px" }}
          onOpenChange={open}
          open={popupVisible}
        >
          <div className="chatMsgs">
            <div className="sender-images">
              {con?.attachments &&
                Object?.keys(con?.attachments)?.length > 0 &&
                Object?.keys(con?.attachments)?.length == 1 ? (
                Object?.keys(con?.attachments)?.map((item, index) => {
                  return <img src={con?.attachments[item]?.preview_url} alt="" />;
                })
              ) : Object.keys(con?.attachments)?.length > 1 && (

                <div className="d-flex">
                  <div style={{ left: "-50px", position: "relative", top: "-25px" }}>
                    {chatUserImg == null ? (
                      <ConversationAvatar letter={chatUser?.charAt(0)} />
                    ) : <Avatar src={chatUserImg} />}
                  </div>
                  <div className="grid" style={{ marginLeft: "-31px" }}>

                    {Object?.keys(con?.attachments)?.map((item, index) => {
                      return (
                        <div className="grid-item" key={index}>
                          <img
                            src={con?.attachments[item]?.preview_url}
                            alt=""
                          />


                        </div>
                      )
                    })
                    };

                  </div>





                </div>


              )}
            </div>
            <div onClick={open} >
              {con?.message &&
                <div className="chat_msg">
                  <div style={{ position: "absolute", left: "-51.5px" }}>
                    {chatUserImg == null ? (
                      <ConversationAvatar letter={chatUser?.charAt(0)} />
                    ) : <Avatar src={chatUserImg} />}
                  </div>

                  <div className="d-flex">
                    <div>
                      <p className="messageStyle"> {con?.message}</p>
                    </div>
                    <div
                      className="reaction"
                      style={{
                        position: "relative",
                        top: "-23.5px",
                        left: "12px"
                      }}
                    >
                      {con?.hearts == 1 ? (
                        <HeartFilled className="heartreact" style={{ fontSize: "17px" }}
                        />) : null
                      }

                      {
                        con?.thumbs_up == 1 ? (
                          <LikeFilled className="likeReact" style={{ fontSize: "17px" }} />
                        ) : null
                      }
                      {
                        con?.thumbs_down == 1 ? (
                          <DislikeFilled className="dislikeReact" style={{ fontSize: "17px" }} />)
                          : null
                      }

                      {
                        con?.question_marks == 1 ? (
                          <QuestionOutlined className="quesReact" style={{ fontSize: "17px" }} />
                        ) : null
                      }
                    </div>

                  </div>
                </div>
              }
            </div>
          </div>



          {feature?.map(f => {
            return (
              f?.data && (
                (
                  <div className="featuredMsg__received">
                    <div style={{ position: "absolute", left: "15.5px" }}>
                      {chatUserImg == null ? (
                        <ConversationAvatar letter={chatUser?.charAt(0)} />
                      ) : <Avatar src={chatUserImg} />}
                    </div>
                    <div className="featured">

                      <div>
                        <img
                          src={f?.data.image_url ?? Default}
                          width="50"
                          alt=""
                        />
                      </div>
                      <div className="featured_detail">
                        <h6 style={{ fontWeight: "bold" }}>
                          {" "}
                          {f?.data[f?.title]}
                        </h6>
                        <div>
                          <h6>{f?.data?.description?.length <= 27 ? f?.data?.description :
                            f?.data?.description?.slice(1, 27)

                          }</h6>
                          <h6>
                            {f?.data?.series_description?.length <= 27
                              ? f?.data?.series_description
                              : f?.data?.series_description?.slice(1, 27)}
                          </h6>
                          <h6>
                            {f?.data?.book_description?.length <= 27
                              ? f?.data?.book_description
                              : f?.data?.book_description?.slice(1, 27)}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="featured_date">
                      <p>
                        Updated:{" "}
                        <span>
                          {moment(f?.updated_at)
                            .subtract(1, "month")
                            .format("MMM DD,YYYY")}
                        </span>
                      </p>
                    </div>
                  </div>
                )
              )
            )
          })}




        </Popover>
      </Dropdown>

      {
        con?.replies?.length > 0 && (
          <div className="threadReplies">
            <button
              className="showthread"
              type="button"
              onClick={() => setShowReplies(true)}
            >
              {con?.replies?.length} Thread Reply
            </button>
            {con?.replies?.length > 0 &&
              showReplies &&
              con?.replies?.map((reply) => (
                <p className="chatrepliedText">{reply?.message}</p>
              ))}
            {showReplies && (
              <button
                className="hideBtn"
                type="button"
                onClick={() => setShowReplies(false)}
              >
                Hide Replies
              </button>
            )}
          </div>
        )
      }
    </div >
  );
};

export default ReceiveMessage;

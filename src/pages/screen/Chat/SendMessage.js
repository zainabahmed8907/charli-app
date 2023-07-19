import { Avatar, Dropdown, Menu, Popover } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  DeleteOutlined,
  LikeFilled,
  HeartFilled,
  DislikeFilled,
  QuestionOutlined
} from '@ant-design/icons';
import Copy from '../../../assets/images/Shape.png';
import Edit from '../../../assets/images/Edit.png';

import Default from '../../../assets/images/newbook.png';
const SendMessage = ({ con, user, type, onmodalAction }) => {
  const menu = (
    <Menu onClick={(e) => onmodalAction(e, con)} style={{ padding: '7px' }}>
      <Menu.Item
        key="Copy"
        style={{ borderBottom: '1px solid #cfcfcf', padding: '10px' }}
      >
        {' '}
        <p>
          <img src={Copy} alt="" className="chatDropDownIcon" />
          <span>Copy Message</span>{' '}
        </p>
      </Menu.Item>
      <Menu.Item
        key="edit_message"
        style={{ borderBottom: '1px solid #cfcfcf', padding: '10px' }}
      >
        {' '}
        <p>
          <img src={Edit} alt="" className="chatDropDownIcon" />
          <span>Edit Message</span>{' '}
        </p>
      </Menu.Item>

      <Menu.Item
        key="delete_message"
        style={{ borderBottom: '1px solid #cfcfcf', padding: '10px' }}
      >
        <p>
          <DeleteOutlined className="deleteDropDownIcon" />
          <span style={{ color: 'red' }}>Delete Message</span>{' '}
        </p>
      </Menu.Item>
    </Menu>
  );
  const [showReplies, setShowReplies] = useState(false);
  const feature = [
    {
      name: 'Timeline',
      title: 'name',
      data: con?.timeline ?? false
    },
    {
      name: 'Plot',
      title: 'plot_planner_title',
      data: con?.plot_planner ?? false
    },
    {
      name: 'Outline',
      title: 'outline_name',
      data: con?.outline ?? false
    },
    {
      name: 'Brainstorm',
      title: 'brainstorm_name',
      data: con?.brainstorm ?? false
    },
    {
      name: 'Series',
      title: 'series_name',
      data: con?.series ?? false
    },
    {
      name: 'Books',
      title: 'book_name',
      data: con?.book ?? false,
    },
  ];
  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        key={con?.id}
        overlayClassName="send_root"
      >
        <div>
          <div className="admin_msg">
              <div className="msg-images">
                {con?.attachments &&
                  Object.keys(con?.attachments)?.length > 0 &&
                  Object.keys(con?.attachments)?.length == 1 ? (
                  Object.keys(con?.attachments)?.map((item, index) => {
                    return (
                      <>
                        <div className="pictureMsg">
                          <img src={con?.attachments[item]?.preview_url} alt="" />



                        </div>
                        <div style={{ left: "23px", position: "relative" }}>
                          <Avatar src={user[0]?.user?.profile_image} />
                        </div>
                      </>
                    );
                  })
                ) : Object.keys(con?.attachments)?.length > 1 && (

                  <div className='d-flex'>

                    <div className="grid">
                      {Object?.keys(con?.attachments)?.map((item, index) => {
                        return (

                          <div className="grid-item" key={index}>
                            <img
                              src={con?.attachments[item]?.preview_url}
                              alt=""
                            />

                          </div>


                        );
                      })}


                    </div>
                    <div style={{ left: "23px", position: "relative", top: "-25px" }}>
                      <Avatar src={user[0]?.user?.profile_image} />
                    </div>
                  </div>

                )}
              </div>

              {
                con?.message &&
                <>
                  <div
                    className="msg_text">
                    <div className='d-flex'>
                      <div>
                        <p className="messageStyle"> {con?.message}</p>
                      </div>

                      <div
                        className="reaction"
                        style={{
                          position: "relative",
                          top: "-22px",
                          left: "17px"
                        }}
                      >
                        {con?.hearts == 1 ? (
                          <HeartFilled
                            className="heartreact"
                            style={{ fontSize: "17px" }}
                          />
                        ) : con?.thumbs_up == 1 ? (
                          <LikeFilled
                            className="likeReact"
                            style={{ fontSize: "17px" }}
                          />
                        ) : con?.thumbs_down == 1 ? (
                          <DislikeFilled
                            className="dislikeReact"
                            style={{ fontSize: "17px" }}
                          />
                        ) : con?.question_marks == 1 ? (
                          <QuestionOutlined
                            className="quesReact"
                            style={{ fontSize: "17px" }}
                          />
                        ) : null}
                      </div>
                      {/* <p className="message_time">
                      {moment(con?.message_time).format('DD-MM-YYYY')}
                    </p> */}
                    </div>


                  </div>
                  <div className="adminAvatar" style={{ position: "relative", top: "12px" }}>
                    <Avatar src={user[0]?.user?.profile_image} />
                  </div>
                </>
              }
          </div>


          {feature?.map((f) => {
            return (
              f?.data && (
                <div className="featuredCardMsg">
                  <div className="featuredMsg">
                    <div className="featured">
                      <div>
                        <img
                          src={f?.data?.image_url ?? Default}
                          width="50"
                          alt=""
                        />
                      </div>
                      <div className="featured_detail">
                        <h6 style={{ fontWeight: 'bold' }}> {f?.data[f?.title]}</h6>
                        <div>
                          <h6>
                            {f?.data?.description?.length <= 27
                              ? f?.data?.description
                              : f?.data?.description?.slice(1, 27)}
                          </h6>
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
                        Updated:{' '}
                        <span>
                          {moment(f?.updated_at)
                            .subtract(1, 'month')
                            .format('MMM DD,YYYY')}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="adminAvatar">
                    <Avatar src={user[0]?.user?.profile_image} />
                  </div>
                </div>
              )
            );
          })}
        </div>

      </Dropdown >

      {con?.replies?.length > 0 && (
        <div className="sentthreadReplies">
          <div>
            <button
              className="showthread"
              type="button"
              onClick={() => setShowReplies(true)}
            >
              {con?.replies?.length} Thread Reply
            </button>
            {con?.replies?.length > 0 &&
              showReplies &&
              con?.replies?.map((reply, i) => (
                <p className="repliedtxt" key={i}>
                  {reply?.message}
                </p>
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
        </div>
      )
      }
    </>
  );
};

export default SendMessage;

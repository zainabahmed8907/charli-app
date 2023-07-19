/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Modal, message, Button, Card } from 'antd';
import ConversationSearch from '../../../components/conversation/conversation-search/ConversationSearch';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteMsg,
  getChats,
  getContacts
} from '../../../redux/Slice/ChatSlice';
import ChatTitle from '../../../components/chat-title/ChatTitle';
import Path from '../../../assets/images/Path.png';
import file from '../../../assets/images/Fill 1.png';
import { instantCommand } from './Constants/DropdownList';

import firebaseConfig from '../../../firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import axios from 'axios';
import SendMessage from './SendMessage';
import ReceiveMessage from './ReceivedMessage';
import NoConversations from '../../../components/conversation/no-conversations/NoConversations';

import BrainsStromPlus from '../../../assets/images/barinstorm_plus.png';
import { apiServices } from '../../../services/apiServices/Api';
import FeatureCard from './FeatureCard';

const Chat = ({ copyText }) => {
  const dispatch = useDispatch();
  const { chats } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  const conversations = chats?.length > 0 ? chats[0] : [];
  const [chatStarted, setChatStarted] = useState(false);
  const [chatData, setChatData] = useState({});
  const [selectedFeatureData, setSelectedFeatureData] = useState({});

  const [onlineContactListActiveMembers, setOnlineContactListActiveMembers] =
    useState([]);
  const [contactListActiveMembers, setContactListActiveMembers] = useState([]);
  const [chatUser, setChatUser] = useState('');
  const [chatUserImg, setChatuserImg] = useState();
  const [loader, setLoader] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [msgTxt, setMsgtext] = useState('');
  const [messagesList, setMessagesList] = useState([]);
  const [replyMessage, setReplyMessage] = useState();
  const [fileLimit, setFileLimit] = useState(false);
  const [queryFeature, setQueryFeature] = useState(null);
  const [selectedImage, setSeelctedImage] = useState([]);
  const [featureData, setSearchFeatureData] = useState([]);
  const [instantFeature, setinstantFeature] = useState([
    'timeline',
    'brainstorm',
    'outline',
    'plot',
    'book',
    'series'
  ]);

  const [visibleID, setVisibleId] = useState();

  const ref = useRef(null);
  const [curretnChatId, setCurrentChatId] = useState();
  const [replyBox, setReplyBox] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [instantPopVisible, setInstantPopVisible] = useState(false);
  const [lastSeen, setLastSeen] = useState('');
  const [editKey, setEditKey] = useState('');
  const [replyKey, setReplykey] = useState('');
  const [copiedText, setCopiedtext] = useState();

  useEffect(async () => {
    if (firebase?.apps?.length === 0) {
      await firebase?.initializeApp(firebaseConfig);
      if (chatData?.firebaseId != null) {
        listenFirebaseMessages(chatData?.firebaseId);
      }
      contactListActiveMembers?.length > 0 && listenActiveUsers();
    } else {
      contactListActiveMembers?.length > 0 && listenActiveUsers();
    }
    dispatch(getContacts());
  }, [chatData]);

  function listenActiveUsers() {
    const messageRef = firebase
      .firestore()
      .collection('activeUsers')
      .where('email', 'in', [...contactListActiveMembers])
      .where('active', '==', true);
    messageRef.onSnapshot((querySnap) => {
      setOnlineContactListActiveMembers(querySnap?._docs);
    });
  }

  //initilaize the chat
  const navigateToChat = (item) => {
    let group_id = item?.contact?.id;
    let firebaseId = item?.contact?.id;
    // getActiveMembers(item);

    if (item?.contact_type == 'User') {
      firebaseId = `${item?.contact?.id + user[0]?.user?.id}`;
    }
    setChatStarted(true);
    setChatData({
      ...item,
      contact_id: group_id,
      firebaseId: firebaseId
    });
    setChatUser(`${item?.contact?.name}`);
    setChatuserImg(`${item?.contact?.icon}`);
    setLastSeen(item?.latest_chat?.message_time?.readable);
    listenFirebaseMessages(firebaseId);
  };
  const navigateToSearchChat = (item) => {
    let group_id = item?.id;
    let firebaseId = item?.id;
    // getActiveMembers(item);

    firebaseId = `${item?.id + user[0]?.user?.id}`;

    setChatStarted(true);
    setChatData({
      ...item,
      contact_id: group_id,
      firebaseId: firebaseId
    });
    setChatUser(`${item?.name}`);
    setChatuserImg(`${item?.profile_image}`);
    // setLastSeen(item?.latest_chat?.message_time?.readable);
    listenFirebaseMessages(firebaseId);
  };

  //get messages list
  const listenFirebaseMessages = (firebaseId) => {
    const messageRef = firebase
      ?.firestore()
      .collection('chat')
      .doc(`${firebaseId}`)
      .collection('messages')
      .orderBy('createdAt', 'asc');
    messageRef.onSnapshot((querySnap) => {
      const allmsg = querySnap.docs.map((docSnap) => {
        const data = docSnap.data();
        console.log('active msgs', data);
        let createdAt = data?.createdAt
          ? docSnap.data().createdAt.toDate()
          : new Date();
        return {
          ...docSnap.data(),
          createdAt: createdAt
        };
      });

      setMessagesList(allmsg);
    });
  };

  const getFeature = async () => {
    try {
      const response = await apiServices.get(`/get-features`);

      if (response.data) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const _getFeature = async () => {
    try {
      const data = await getFeature();
      if (data != null && typeof data !== undefined) {
        let result = Object.entries(data);
        return result;
      }
    } catch (error) {
      console.log('Catch Error: ', error);
      throw error;
    }
  };
  const searchFeatureData = async (feature, query) => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.get(
        `https://charliiapp.clickysoft.net/api/v1/search-chat-items/${feature}?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('search feature data', data);
      if (data) {
        return data;
      }
    } catch (error) {
      throw error;
    }
  };

  //on change message for txt
  const onChangeTxt = (txt) => {
    if (txt.target.value[0] == '/') {
      let query = txt.target.value.split('/');
      let result = instantFeature?.find(
        (item) => item == query[1].toLowerCase()
      );
      if (result != null) {
        console.log(result, query[1]);

        setQueryFeature(result);
        getFeatureSearch(result, query[1] ?? '');
      } else {
        setQueryFeature(null);
      }
    }

    setMsgtext(txt.target.value);
  };

  //onchange file
  function handleImageChange(e) {
    const chosenFiles = Array?.prototype?.slice?.call(e?.target?.files);
    const displayedFiles = Array?.from(chosenFiles);

    if (displayedFiles?.length > 3) {
      message.error("You can't select more than 3 images");
    }
    const images = displayedFiles.filter(file => file?.type?.startsWith('image/'));
    setSeelctedImage(images?.map(image => URL?.createObjectURL(image)));
    handleUploadFiles(chosenFiles);



    // if (chosenFiles?.type != 'image/jpeg' && chosenFiles?.type != 'image/png') {
    //   message.error('Please Select JPEG or PNG file');
    // }


  }


  //cancl selected files
  const handleImageCancel = index => {
    setSeelctedImage(prevImages => {
      const newImages = [...prevImages];
      newImages?.splice(index, 1);
      return newImages;
    });
    setImageData(prevImages => {
      const newImages = [...prevImages];
      newImages?.splice(index, 1);
      return newImages;
    });

  };
  const addChat = async (form) => {
    const token = localStorage.getItem('token');

    try {
      const { data } = await axios.post(
        `https://charliiapp.clickysoft.net/api/v1/chats`,
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (data) {
        return data;
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const editMessage = async (id, msg) => {
    const token = localStorage.getItem('token');
    console.log('edit msg', id, msg);

    try {
      const { data } = await axios.put(
        `https://charliiapp.clickysoft.net/api/v1/chats/${id}`,
        msg,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (data) {
        console.log('edit mesg', data);
        return data;
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const _onAdd = (usermsg) => {
    firebase
      .firestore()
      .collection('chat')
      .doc(`${chatData?.firebaseId}`)
      .collection('messages')
      .doc(`${usermsg.id}`)
      .set({
        ...usermsg,
        userId: user[0]?.user?.id,
        createdAt: firebase?.firestore.FieldValue.serverTimestamp()
      });
  };

  const handleUploadFiles = (files) => {
    const uploaded = [...imageData];
    // setSeelctedImage(URL.createObjectURL(files[0]));


    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === 3) {
          setFileLimit(true);

        }
        if (uploaded.length > 3) {
          message.warn(`You can only add a maximum of ${3} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }

      }
    });
    if (!limitExceeded) {
      setImageData(uploaded);
    }

  };

  //edit message
  const _onEdit = (msg, chat_id) => {
    console.log(msg, chat_id);
    const messageRef = firebase
      .firestore()
      .collection('chat')
      .doc(`${chatData?.firebaseId}`)
      .collection('messages')
      .doc(`${chat_id}`);
    messageRef.update({
      ...msg
    });
  };

  const displaySelectedFeatureItemCard = (item) => {
    setSelectedFeatureData(item);
    console.log(item);
    console.log('selected feature', selectedFeatureData);
    setMsgtext('');
    const usermsg = {
      type: 'feature',
      data: item
    };
    setMessagesList([...messagesList, usermsg]);
  };

  const onmodalAction = (e, data) => {
    switch (e.key) {
      case 'delete_message':
        deleteChatMsg(data);
        break;
      case 'reply':
        setReplykey('reply');
        setCurrentChatId(data?.id);

        replyChatMsg(data?.id);
        setReplyBox(true);
        setReplyText(data?.message);
        break;
      case 'thread_reply':
        setReplykey('thread_reply');
        setCurrentChatId(data?.id);

        replyChatMsg(data?.id);
        setReplyBox(true);
        setReplyText(data?.message);
        break;
      case 'edit_message':
        setCurrentChatId(data?.id);

        setEditKey('edit_message');
        const get = messagesList.find((item) => item.id == data?.id);
        setReplyMessage(get);
        console.log('msg', data);
        break;

      case 'copy':
        handleCopyClick(data?.message);
        message.success('message copied succesfully');
        break;
      default:
        return;
    }
  };

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }
  const handleCopyClick = (copied) => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copied)
      .then(() => {
        // If successful, update the isCopied state value
        setCopiedtext(copied);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //send message

  const _sendMessage = async (e, type = 'send') => {
    e.preventDefault();
    if (msgTxt.length == 0 && imageData.length == 0) {
      const filter = messagesList.find((item) => item.type == 'feature');
      if (filter == undefined) {
        return;
      }
    }
    try {
      if (msgTxt.length > 300) {
        message.error('message limit exceeded 300 characters');
        return;
      }
      const form = new FormData();
      if (chatData?.contact_type === 'User') {
        form.append('to_id', chatData?.contact_id);
      } else {
        form.append('group_id', chatData?.contact_id);
      }
      type != 'featureData' && form.append('message', msgTxt);

      const filter = messagesList.filter((item) => item?.type == 'feature');
      if (filter != null) {
        for (var key in filter) {
          form.append(
            `${instantCommand[filter[key].data.name].id}`,
            filter[key].data.id
          );
        }
      }

      if (imageData.length != 0) {
        for (const file of imageData) {
          console.log(file?.type);
          if ((file?.type != 'image/jpeg' && file?.type != 'image/png')) {
            message.error('Please Select JPEG or PNG file');
          }
          else {
            form.append('attachments[]', file);
          }
        }
      }
      if (
        (replyMessage?.message &&
          (replyKey == 'reply' || replyKey == 'thread_reply')) ||
        (replyMessage?.attachments &&
          (replyKey == 'reply' || replyKey == 'thread_reply'))
      ) {
        form.append('parent_id', replyMessage?.id);
      }

      setMsgtext('');
      setImageData([]);
      setReplyMessage({});
      setReplyBox(false);

      if (replyMessage?.message && editKey == 'edit_message') {
        const { data } = await editMessage(curretnChatId, {
          message: msgTxt
        });
        _onEdit({ message: msgTxt }, curretnChatId);
      } else {
        const { data } = await addChat(form);
        if (
          (replyMessage?.message &&
            (replyKey == 'reply' || replyKey == 'thread_reply')) ||
          (replyMessage?.attachments &&
            (replyKey == 'reply' || replyKey == 'thread_reply'))
        ) {
          _onEdit(data, curretnChatId);
        } else {
          _onAdd(data);
        }
      }
    } catch (err) {
      message.error('error whilst sending message');
    }
  };

  const renderInstantModalView = (item) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '10px',
          alignItems: 'center',
        }}
      >
        <img
          src={instantCommand[item]?.icon ?? BrainsStromPlus}
          width="20"
          alt=""
          style={{ marginRight: '10px' }}
        />
        <div style={{ color: 'black', display: 'flex' }}>
          <h6> {instantCommand[item]?.title}</h6>
          <div style={{ marginLeft: '10px' }}>
            <h6 style={{ color: 'gray' }}>{instantCommand[item]?.query}</h6>
          </div>
        </div>
      </div>
    );
  };

  const getFeatureSearch = async (queryFeature, query) => {
    setLoader(true);
    try {
      const { data } = await searchFeatureData(queryFeature, query);
      setSearchFeatureData(data);
      console.log('feature search  data', data);
      setLoader(false);
    } catch (error) {
      console.debug(error);
      setLoader(false);
    }
  };

  //delete message
  const deleteChatMsg = async (data) => {
    try {
      dispatch(deleteMsg(data?.id));
      console.log(data.userId, user[0]?.user?.id);
      if (data?.userId == user[0]?.user?.id) {
        firebase
          .firestore()
          .collection('chat')
          .doc(`${chatData?.firebaseId}`)
          .collection('messages')
          .doc(`${data?.id}`)
          .delete();
      } else {
        let msg = { notVisible: user[0]?.user?.id };
        setVisibleId(msg.notVisible);
        _onEdit(msg, data?.id);
      }
    } catch (error) {
      console.debug(error);
      setLoader(false);
    }
  };
  const [open, setopen] = useState(false);

  const setVisible = () => {
    setopen(true);
    setInstantPopVisible(!instantPopVisible);
    setQueryFeature(null);
    setMsgtext('');
    setSearchFeatureData([]);
  };

  const onCancel = () => {
    let msgList = messagesList;
    msgList.pop();
    setMessagesList([...msgList]);
    setQueryFeature(null);
    setSearchFeatureData([]);
  };
  const replyChatMsg = async (id) => {
    try {
      const get = messagesList.find((item) => item.id == id);
      setReplyMessage(get);
    } catch (error) {
      setLoader(false);
    }
  };

  //handle Image Select


  const InstantCommandsModal = () => {
    return (
      <div className="instant_command_modal">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <div>
            <img src={Path} width="10" alt="" />
          </div>
          <div>
            <h6 style={{ marginLeft: '10px' }}>Instant Commands</h6>
          </div>
        </div>
        {queryFeature != null && renderInstantModalView(queryFeature)}
        {queryFeature != null && featureData?.length == 0 ? (
          <h6>No Record Found</h6>
        ) : (
          featureData?.map((item) => {
            let name = instantCommand[queryFeature]?.name;
            let description = instantCommand[queryFeature]?.description;
            return (
              <div
                style={{
                  paddingRight: '20px'
                }}
              >
                <div
                  onClick={() => {
                    setInstantPopVisible(false);
                    displaySelectedFeatureItemCard({
                      ...item,
                      name: queryFeature
                    });
                  }}
                  style={{
                    backgroundColor: '#f7f7f7',
                    border: 'none',
                    borderRadius: '10px',
                    width: '350px',
                    display: 'flex',
                    padding: '10px',
                    marginBottom: '10px',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ padding: '10px' }}>
                    <img
                      width="55"
                      height="55"
                      src={item?.image_url ?? BrainsStromPlus}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'flex-start'
                    }}
                  >
                    <h6 style={{ fontWeight: 'bold' }}>{item[name]}</h6>
                    <h6>
                      {item[description]?.length <= 27
                        ? item[description]
                        : item[description]?.slice(1, 28)}
                    </h6>
                  </div>
                </div>
              </div>
            );
          })
        )}
        {queryFeature == null &&
          instantFeature?.length > 0 &&
          instantFeature?.map((item) => {
            return renderInstantModalView(item);
          })}
        {/* {featureTag.map((item) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  marginHorizontal: 5,
                  alignItems: 'center',
                }}>
                <Image source={item.icon} size={20} resizeMode="contain" />
                <TextWrapper
                  style={{left: 5}}
                  variant="h6"
                  color={Colors.black}>
                  {item.title}
                  <TextWrapper color={Colors.middleGrey} variant="h6">
                    {item.query}
                  </TextWrapper>
                </TextWrapper>
              </View>
            );
          })} */}
      </div>
    );
  };

  return (
    <div id="chat-main">
      <div className="main-container main">
        <Row className="card-container2" id="chat-container">
          <Col xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
            <ConversationSearch
              conversations={conversations}
              navigateToChat={navigateToChat}
              searchChat={navigateToSearchChat}
            />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={17}
            lg={17}
            xl={17}
            xxl={17}
            className="chat-form-container"
          >
            <div>
              <div>
                {chatStarted ? (
                  <ChatTitle
                    chatUser={chatUser}
                    chatUserImg={chatUserImg}
                    lastSeen={lastSeen}
                  />
                ) : (
                  ''
                )}
              </div>

              <div style={{ position: 'relative', height: "100%", background: "#F7F7F7" }}>
                <div id="chat-message-list">
                  {chatStarted ? (
                    messagesList?.map((con) => {
                    
                      if (con?.notVisible == user[0]?.user.id) {
                        return;
                      }
                      return (
                        <>
                          {con?.type == 'feature' && (
                            <>
                              <FeatureCard
                                instantCommand={instantCommand}
                                onSend={(e) => _sendMessage(e, 'featureData')}
                                selectedFeatureData={selectedFeatureData}
                                item={con}
                                onCancel={onCancel}
                                id={con?.data?.id}
                              />
                            </>
                          )}
                          {con?.type != 'feature' && (
                            <>
                              {con?.userId === user[0]?.user.id ? (
                                <SendMessage
                                  con={con}
                                  user={user}
                                  deleteMessage={deleteChatMsg}
                                  onmodalAction={onmodalAction}
                                />
                              ) : (
                                <ReceiveMessage
                                  con={con}
                                  user={user}
                                  onmodalAction={onmodalAction}
                                  inputRef={ref}
                                  _onEdit={_onEdit}
                                  chatUser={chatUser}
                                />
                              )}
                            </>
                          )}
                        </>
                      );
                    })
                  ) : (
                    <NoConversations />
                  )}
                </div>

                <div className={replyBox ? 'replyBox' : 'hideReplyBox'}>
                  <p>{replyText}</p>
                </div>

                {instantPopVisible && <InstantCommandsModal />}
                {selectedImage?.length > 0 && <div className="display-image">
                  {selectedImage?.map((image, index) => (
                    <div key={index} className='mr-3 image-wrapper'>
                      <img src={image} alt={`Selected ${index}`} width="100" height="100" />
                      <button className='cancel-Image' onClick={handleImageCancel}>X</button>
                    </div>
                  ))}
                </div>
                }
                {chatStarted ? (
                  <form id="chat-form" onSubmit={_sendMessage}>

                    <div className="chat-input-container">

                      <div className="d-flex">
                        <div className="file-image">

                          <label className="fileLabel">
                            <input
                              type="file"
                              onChange={
                                handleImageChange
                              }
                              name="attachments[]"
                              multiple
                              accept='image/jpeg, image/png'

                            />
                            <figure class="file-figure">
                              <img src={file} className="fileIcon" alt="icon"
                              />
                            </figure>{' '}
                          </label>
                        </div>

                        <div className="attachments">
                          <a onClick={setVisible}>
                            <img src={Path} alt="path" />
                          </a>
                        </div>
                      </div>
                      <input
                        ref={ref}
                        type="text"
                        placeholder="Type your message or use speech to text"
                        value={msgTxt}
                        name="message"
                        onChange={(e) => onChangeTxt(e)}
                      />
                    </div>
                    <button className="sendMsgbtn" type="submit" onClick={() => setSeelctedImage(null)}>
                      Send
                    </button>
                  </form>
                ) : null}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Chat;

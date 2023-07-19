import "./index.scss";
import { CaretDownOutlined, PlusOutlined } from "@ant-design/icons";

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCharacter,
  getCharacters,
  updateCharacter,
} from "../../redux/Slice/CharacterSlice";
import { useState } from "react";
import CharacterModal from "../../components/timeline/timeline-events/AddCharacterModal";
import EditCharacterModal from "../../components/timeline/timeline-events/edit/EditCharacterModal";
import { Popover, message } from "antd";
import {
  AddEventBlockModal,
  EditEventBlockModal,
} from "../../components/timeline/timeline-events/EventBlock/AddEventBlockModal";
import { getTimeline } from "../../redux/Slice/TimelineSlice";
import { updateEvBlock } from "../../redux/Slice/EventBlockSlice";
import { useRef } from "react";

const Content = ({ c_id, path_id, close }) => {
  const [editModal, setEditModal] = useState(false);

  const showEditModal = () => {
    setEditModal(true);
  };
  const editModalOk = () => {
    setEditModal(false);
  };
  const EditModalCancel = () => {
    setEditModal(false);
  };
  const dispatch = useDispatch();

  const deleteChar = (cid) => {
    dispatch(deleteCharacter(cid));
    setTimeout(() => {
      dispatch(getCharacters(path_id));
    }, 1000);
  };

  const EditCharacter = (data) => {
    try {
      const payload = { id: c_id, data: data };
      dispatch(updateCharacter(payload));
      setTimeout(() => {
        dispatch(getCharacters(path_id));
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="edit">
        <button onClick={() => {
          showEditModal();
          close();
        }}>
          Edit
          <span className="ml-2">
            <i className="fa fa-check"></i>
          </span>
        </button>
      </div>

      <div className="delete-btn">
        <button
          onClick={() => {
            deleteChar(c_id);
            close();

          }}
        >
          Delete
          <span className="ml-2">
            <i className="fa fa-times"></i>
          </span>
        </button>
      </div>
      <EditCharacterModal
        isModalOpen={editModal}
        handleCancel={EditModalCancel}
        handleOk={editModalOk}
        onSubmit={EditCharacter}
        char_id={c_id}
      />
    </div>
  );
};
const TimelineEvent = () => {
  const { id } = useParams();
  const [modalOpen, setIsModalOpen] = useState(false);
  const [blockk, setBlockk] = useState({});

  const [eventModalOpen, setIsEventModalOpen] = useState(false);
  const [updateBlock, setUpdateBlock] = useState(false);
  const [openIndex, setOpenIndex] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const { characters } = useSelector((state) => state.character);
  const { loading, timeline } = useSelector((state) => state.timeline);
  const [blockSize, setBlockSize] = useState(0);
  const [width, setWidth] = useState(300);

  const [stretching, setStretching] = useState(false);
  const [delta, setDelta] = useState(1);
  const [blockId, setBlockId] = useState();
  const [clicked, setClicked] = useState(false);
  const divRef = useRef(null);



  const dispatch = useDispatch();

  const showCharacterModal = () => {
    setIsModalOpen(true);
  };
  const characterModalOk = () => {
    setIsModalOpen(false);
  };
  const characterModalCancel = () => {
    setIsModalOpen(false);
  };

  const showEventModal = () => {
    setIsEventModalOpen(true);
  };
  const eventModalOk = () => {
    setIsEventModalOpen(false);
  };
  const eventModalCancel = () => {
    setIsEventModalOpen(false);
  };

  const showUpdateBlock = () => {
    setUpdateBlock(true);
  };
  const blockModalOk = () => {
    setUpdateBlock(false);
  };
  const blockModalCancel = () => {
    setUpdateBlock(false);
  };

  const char = timeline[0]?.data?.timeline_characters?.map((c) => c);

  const handleMouseDown = (event, index) => {
    setStretching(true);
    setDelta(event.clientX - width);
  };

  const handleMouseMove = (event, id) => {
    if (clicked) {
      if (stretching) {
        setWidth(event.clientX - delta);

      }
    }
  };
  function handleClick() {
    setClicked(true);
  }

  function handleMouseClick(event) {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setClicked(false);

    }
    // let widths = [];
    // const [style, setStyle] = useState([]);
    // const blocks = char?.map((ch, index) => {
    //   return (
    //     char[index]?.blocks?.length > 0 &&
    //     char[index]?.blocks?.map((block, i) => {
    //       return block;
    //     }))
    // });
    // const func = () => {
    //   for (let i = 0; i < blocks?.length; i++) {
    //     let w = blocks[i][0]?.size

    //     widths.push(w);
    //     setWidth(widths);

    //   }
    //   console.log(width);
    //   setStyle(widths?.map((width) => ({ width })));

    // }
  }
  const blocks = char?.map((ch, index) => {
    return (
      char[index]?.blocks?.length > 0 &&
      char[index]?.blocks?.map((block) => {
        return block;
      }))
  });

  const handleMouseOut = () => {
    setStretching(false);
    setClicked(false);
    const blockData = {
      position_x: delta,
      size: width,
    };
    try {
      const payload = { id: blockId, data: blockData };
      dispatch(updateEvBlock(payload));
      setTimeout(() => {
        dispatch(getTimeline(id));
      }, 1000);
    } catch (e) {
      message.error("Can't update block size");
    }
    // for (let i = 0; i < blocks?.length; i++) {
    //   setWidth(blocks[i][0]?.size);
    //   console.log("now width", width);
    // }
  }


  const close = () => {
    setPopupVisible(false);
  };

  const open = (index) => {
    setPopupVisible(true);
    setOpenIndex(index);
  };
  const handleOpenChange = (newOpen) => {
    setPopupVisible(newOpen);
  };

  useEffect(() => {
    let wait = false;
    if (!loading && !wait) {
      dispatch(getCharacters(id));
    }
    // func();
    return () => {
      wait = true;
    };
  }, []);

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleMouseClick);
  //   return () => {
  //     document.removeEventListener('mousedown', handleMouseClick);
  //   };
  // }, []);

  return (
    <>
      <div className="eventDiv">
        <div className="characterBlock" style={{ maxHeight: "200px" }}>
          <div style={{ position: "relative", bottom: "20px" }}>
            <button className="newEventbtn" onClick={showEventModal}>
              <PlusOutlined className="mr-1 plusIcon" />
              <span>Add Event Block</span>
            </button>
            <button className="newEventbtn" onClick={showUpdateBlock}>
              <PlusOutlined className="mr-1 plusIcon" />
              <span>Edit Event Block</span>
            </button>
          </div>
          {characters?.length > 0 &&
            characters?.map((c) => (
              <div>
                <div>
                  <Popover
                    id={c?.id}
                    placement="rightBottom"
                    content={<Content c_id={c?.id} path_id={id} close={close} />}
                    title="Actions"
                    trigger="click"
                    style={{ cursor: "pointer" }}
                    open={c?.id == openIndex && popupVisible}

                    openIndex={openIndex}
                    popupVisible={popupVisible}
                    onOpenChange={handleOpenChange}

                  >
                    <button className="charName mr-2" onClick={() => open(c?.id)}>
                      <CaretDownOutlined className="caretIcon" />{" "}
                      <span>{c?.character_name}</span>{" "}
                    </button>
                  </Popover>
                  <div className="block mt-2 mb-2">
                    {char?.map((ch, index) => {
                      return (
                        char[index]?.blocks?.length > 0 &&
                        char[index]?.blocks?.map((block, index) => {
                          return (
                            block?.character_id == c?.id && (
                              <div style={{ height: "90px" }}>
                                <div
                                  style={{
                                    position: "absolute",
                                    backgroundColor: block?.color_code,
                                    width:

                                      (blockId == block?.id ) ?
                                        `${width}px` : `${block?.size}px`,
                                    cursor: "se-resize",
                                  }}
                                  onMouseDown={handleMouseDown}
                                  onMouseMove={handleMouseMove}
                                  onMouseOut={handleMouseOut}

                                  ref={divRef}

                                  onClick={() => {

                                    setBlockId(block?.id);
                                    setClicked(true);
                                  }}
                                  className="event-block"
                                  id={index}
                                >
                                  <div className="event-detail">
                                    <p>
                                      {block?.event_name}
                                    </p>
                                    <p>{block?.event_description}</p>
                                  </div>
                                  <div className="event-outline">
                                    {block?.outline}
                                  </div>
                                </div>
                              </div>
                            )
                          );
                        })
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          <div className="newCharBtn">
            <button onClick={showCharacterModal} className="mt-3 newChar">
              <CaretDownOutlined className="caretIcon" />
              New Character
            </button>
          </div>
        </div>
      </div>

      <CharacterModal
        isModalOpen={modalOpen}
        handleCancel={characterModalCancel}
        handleOk={characterModalOk}
        isUpdate={false}
      />
      <AddEventBlockModal
        handleOk={eventModalOk}
        handleCancel={eventModalCancel}
        isModalOpen={eventModalOpen}
      />

      <EditEventBlockModal
        handleOk={blockModalOk}
        handleCancel={blockModalCancel}
        isModalOpen={updateBlock}
      />
    </>
  );
};
export default TimelineEvent;

import React, { useEffect, useState } from "react";
import TimelineEvent from "../cards/timelineEvent";
import { Button, Row, Col, Popover } from "antd";
import BookNameOutlineCard from "../cards/outline-cards/book-name-outline/BookNameOutlineCard";
import "../../pages/screen/index.scss";
import Menu from "../../assets/icons/menu.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEvent,
  getEventTypeList,
  getTimeline,
  postEventType,
  updateEvent,
} from "../../redux/Slice/TimelineSlice";

import { useParams } from "react-router-dom";
import UpdateEventModal from "../UpdateEventModal";
import AddEventModal from "./timeline-events/AddEventModal";
import { getOutlineList } from "../../redux/Slice/OutlineSlice";

const Content = ({ e_id, path_id, close }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const deleteevent = (eid) => {
    dispatch(deleteEvent(eid));
    setTimeout(() => {
      dispatch(getEventTypeList(path_id));
    }, 1000);
  };
  const showUpdateModal = () => {
    setIsModalOpen(true);
  };
  const handleUpdateOk = () => {
    setIsModalOpen(false);
  };
  const handleUpdateCancel = () => {
    setIsModalOpen(false);
  };

  const EditEvent = (data) => {
    try {
      const payload = { id: e_id, data: data };
      console.log("update payload", payload);
      dispatch(updateEvent(payload));
      setTimeout(() => {
        dispatch(getEventTypeList(path_id));
      }, 1000);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div
        className="edit"
        onClick={(e) => {
          e.preventDefault();
          showUpdateModal();
          close();
        }}
      >
        <button>
          Edit
          <span className="ml-2">
            <i className="fa fa-check"></i>
          </span>
        </button>
      </div>

      <div className="delete-btn">
        <button
          onClick={() => {
            deleteevent(e_id);
            close();
          }}
        >
          Delete
          <span className="ml-2">
            <i className="fa fa-times"></i>
          </span>
        </button>
      </div>
      <UpdateEventModal
        open={isModalOpen}
        ok={handleUpdateOk}
        cancel={handleUpdateCancel}
        onSubmit={EditEvent}
        event_id={e_id}
        id={path_id}
      />
    </div>
  );
};
const Timeline = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { timeline, loading } = useSelector((state) => state.timeline);
  const { events } = useSelector((state) => state.timeline);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const name = timeline[0]?.data?.timeline?.name;
  const desc = timeline[0]?.data?.timeline?.description;


  const AddEvent = (data) => {
    dispatch(postEventType({ data }));
    setTimeout(() => {
      dispatch(getEventTypeList(id));
    }, 1000);

  }
  //methods
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
      dispatch(getEventTypeList(id));
      dispatch(getTimeline(id));
      dispatch(getOutlineList());
    }
    return () => {
      wait = true;
    };
  }, []);


  return (
    <div className="main-container">
      <BookNameOutlineCard name={name} description={desc} />
      <div className="timelineDiv">
        <Row gutter={24}>
          {events[0]?.length > 0 &&
            events[0]?.map((event) => (
              <Col sm={12} xs={12} lg={6} md={6} xl={6}>
                <div className="mb-5 d-flex justify-between">
                  <div className="chapter-name d-flex justify-between">
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        background: event.color_code,
                        borderRadius: "110px",
                      }}
                      className="mr-2"
                    ></span>
                    <p className="mr-3">{event?.event_type}</p>
                    <div>
                      <span>
                        <Popover
                          id={event?.id}
                          placement="rightBottom"
                          content={<Content e_id={event?.id} path_id={id} close={close} />}
                          title="Actions"
                          trigger="click"
                          style={{ cursor: "pointer" }}
                          openIndex={openIndex}
                          popupVisible={popupVisible}
                          onOpenChange={handleOpenChange}
                          open={event?.id == openIndex && popupVisible}

                        >
                          <img src={Menu} className="ml-4" alt="menu-icon"
                            onClick={() => open(event?.id)} />
                        </Popover>
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <Button
              type="primary"
              size="small"
              className="addButton mb-2"
              style={{ cursor: "pointer" }}
              onClick={showModal}
            >
              New Event Type
            </Button>
            <AddEventModal
              handleOk={handleOk}
              handleCancel={handleCancel}
              isModalOpen={isModalOpen}
              onSubmit={AddEvent}
            />
          </Col>
        </Row>

        <div id="columns-background" className="table-grid">
          <div className="characterDiv">
            <TimelineEvent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;

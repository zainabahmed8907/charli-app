import React, { useRef, useState } from "react";

import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import AddEventDrawer from "../timeline/AddEventDrawer";
import CustomButton from "../button/Button";
import CreateBookIcon from "../../assets/icons/create-book.svg";
import {
  getTimelineList,
  postTimeLine,
  updateTimeline,
  deleteTimeline,
} from "../../redux/Slice/TimelineSlice";
import FullPageSpinner from "../../components/loader/FullPageSpinner";
import ListCard from "../ListCard";
import PackageSubscriptionHook from "../PackageSubscriptionHook";

const Content = ({ path_id, id, close }) => {
  const [updatetimeline, setUpdateTimeline] = useState(false);
  const dispatch = useDispatch();

  const updateData = (data) => {
    try {
      const payload = { id: id, data: data };
      dispatch(updateTimeline(payload));
      setTimeout(() => {
        dispatch(getTimelineList(path_id));
      }, 1000);
      closeUpdateDrawer();
    } catch (e) {
      console.log(e);
    }
  };
  const delete_timeline = (id) => {
    dispatch(deleteTimeline({ id }));
    setTimeout(() => {
      dispatch(getTimelineList(path_id));
    }, 1000);
  };
  const openUpdateDrawer = () => {
    setUpdateTimeline(true);
  };
  const closeUpdateDrawer = () => {
    setUpdateTimeline(false);
  };

  return (
    <div>
      <div className="edit">
        <button
          onClick={(e) => {
            e.preventDefault();
            openUpdateDrawer();
            close();
          }}
        >
          Edit
          <span className="ml-2">
            <i className="fa fa-check"></i>
          </span>
        </button>
      </div>

      <div className="delete-btn">
        <button onClick={() => {
          delete_timeline(id);
          close();
        }}>
          Delete
          <span className="ml-2">
            <i className="fa fa-times"></i>
          </span>
        </button>
      </div>
      <div style={{ marginTop: "20%" }}>
        <AddEventDrawer
          open={updatetimeline}
          close={closeUpdateDrawer}
          onSubmit={updateData}
          isUpdate={true}
          timelineId={id}
        />
      </div>
    </div>
  );
};

const TimelineCards = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  //get timelines from store
  const { timelineData, loading } = useSelector((state) => state.timeline);
  const [openIndex, setOpenIndex] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [timelineSubscription, setTimelineSubscription] = useState(false);
  const ref = useRef();

  useEffect(() => {
    let wait = false;
    if (!loading && !wait) {
      dispatch(getTimelineList(id));
    }
    return () => {
      wait = true;
    };
  }, []);

  const [addEvent, setAddEventDrawer] = useState(false);
  const closeAddEventDrawer = () => {
    setAddEventDrawer(false);
  };
  const showDrawer = () => {
    if (timelineSubscription) {
      setAddEventDrawer(true);
    } else {
      ref?.current?.showModalAction();
    }
  };
  const AddData = (data) => {
    dispatch(postTimeLine({ data }));
    setTimeout(() => {
      dispatch(getTimelineList(id));
    }, 100);
    closeAddEventDrawer(true);

  };

  const checkSubscription = (action) => {
    setTimelineSubscription(action);
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
    dispatch(getTimelineList(id));

  }, []);
  return (
    <div className="main-container">
      <PackageSubscriptionHook
        feature={"timeline-feature"}
        packageName={"timeline-feature"}
        ref={ref}
        title={"Timeline"}
        checkPackageSubscription={checkSubscription}
      />
      <CustomButton
        type="primary"
        buttonTitle={"New Timeline"}
        onClick={() => showDrawer()}
        icon={<img src={CreateBookIcon} alt="Button Icon" />}
      />
      <div className="card-container mt-2">
        <div className="p-3" style={{ maxHeight: "700px", overflowY: "auto" }}>
          {timelineData?.length === 0 ? (
            <h4 style={{ textAlign: "center" }}>
              No Timeline to display,Click on New Timline to add New Timeline
            </h4>
          ) : (
            timelineData.length > 0 &&
            timelineData?.map((timeline) => {
              return (
                <ListCard
                  style={{
                    backgroundColor: timeline?.color_code,
                    color: timeline?.foreground_color,
                    cursor: 'pointer'
                  }}
                  foreground_color={timeline?.foreground_color}
                  color_code={timeline?.color_code}
                  id={timeline?.id}
                  name={timeline?.name}
                  description={timeline?.description}
                  content={<Content path_id={id} id={timeline?.id} close={close} />}
                  pathname="timeline"
                  type="series"
                  icon={timeline?.image_url}
                  open={() => {
                    open(timeline?.id)
                  }}
                  openIndex={openIndex}
                  popupVisible={popupVisible}
                  handleOpenChange={handleOpenChange}
                />
              )
            })
          )}
        </div>
      </div>

      <AddEventDrawer
        open={addEvent}
        close={closeAddEventDrawer}
        onSubmit={AddData}
        isUpdate={false}
      />
    </div>
  );
};

export default TimelineCards;

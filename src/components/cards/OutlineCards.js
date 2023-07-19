import React, { useRef, useState } from "react";

import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteOutline,
  getOutlineList,
  postOutlineData,
  updateOutline,
} from "../../redux/Slice/OutlineSlice";
import { useEffect } from "react";
import CustomButton from "../button/Button";
import CreateBookIcon from "../../assets/icons/create-book.svg";
import ListCard from "../ListCard";
import AddOutlineEventDrawer from "../outline-side-modal/add-event-drawer/AddEventDrawer";
import PackageSubscriptionHook from "../PackageSubscriptionHook";
import FullPageSpinner from "../loader/FullPageSpinner";

const Content = ({ path_id, id, close }) => {
  const [updateoutline, setUpdateOutline] = useState(false);

  const dispatch = useDispatch();

  const updateData = (data) => {
    try {
      const payload = { id: id, data: data };
      dispatch(updateOutline(payload));
      setTimeout(() => {
        dispatch(getOutlineList(path_id));
      }, 1000);
      closeUpdateDrawer();
    } catch (e) {
      console.log(e);
    }
  };
  const delete_outline = () => {
    dispatch(deleteOutline({ id }));
    setTimeout(() => {
      dispatch(getOutlineList(path_id));
    }, 1000);
  };
  const openUpdateDrawer = () => {
    setUpdateOutline(true);
  };
  const closeUpdateDrawer = () => {
    setUpdateOutline(false);
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
          close();
          delete_outline(id);
        }}>
          Delete
          <span className="ml-2">
            <i className="fa fa-times"></i>
          </span>
        </button>
      </div>
      <div style={{ marginTop: "20%" }}>
        <AddOutlineEventDrawer
          outlineID={id}
          onSubmit={updateData}
          close={closeUpdateDrawer}
          open={updateoutline}
          isUpdate={true}
        />
      </div>
    </div>
  );
};

const OutlineCards = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [outlineSubscription, setOutlineSubscription] = useState(false);
  const ref = useRef();

  const { outlineData, loading } = useSelector((state) => state.outline);

  useEffect(() => {
    let wait = false;
    if (!loading && !wait) {
      dispatch(getOutlineList(id));
    }
    return () => {
      wait = true;
    };
  }, []);

  const [addEvent, setAddEventDrawer] = useState(false);
  const [openIndex, setOpenIndex] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  //adding methods of drawer
  const closeAddEventDrawer = () => {
    setAddEventDrawer(false);
  };
  const showDrawer = () => {
    if (outlineSubscription) {
      setAddEventDrawer(true);
    } else {
      ref?.current?.showModalAction();
    }
  };

  ///update drawer methods

  const AddData = (data) => {
    dispatch(postOutlineData({ data }));
    setTimeout(() => {
      dispatch(getOutlineList(id));
    }, 1000);
    closeAddEventDrawer(true);
  };

  const checkSubscription = (action) => {
    setOutlineSubscription(action);
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
  return (
    <div className="main-container">
      <PackageSubscriptionHook
        feature={"outline-feature"}
        packageName={"outline-feature"}
        ref={ref}
        title={"Outline"}
        checkPackageSubscription={checkSubscription}
      />
      <CustomButton
        type="primary"
        buttonTitle="New Outline"
        onClick={() => showDrawer()}
        icon={<img src={CreateBookIcon} alt="Button Icon" />}
      />
      <div className="card-container mt-2">
        <div className="p-3" style={{ maxHeight: "700px", overflowY: "auto" }}>
          {outlineData?.length == 0 ? (
            <h4 style={{ textAlign: "center" }}>
              No Outline to display,Click on Add Outline to add New Outline
            </h4>
          ) : (
            outlineData?.length > 0 &&
            outlineData?.map((outline) => {
              return (
               <ListCard
                  style={{
                    backgroundColor: outline?.color_code,
                    color: outline?.foreground_color,
                    cursor: 'pointer'
                  }}
                  foreground_color={outline?.foreground_color}
                  color_code={outline?.color_code}
                  id={outline?.id}
                  name={outline?.outline_name}
                  description={outline?.description}
                  content={<Content path_id={id} id={outline?.id} close={close} />}
                  pathname="outline"
                  type="series"

                  icon={outline?.image_url}
                  open={() => {
                    open(outline?.id)
                  }}
                  openIndex={openIndex}
                  handleOpenChange={handleOpenChange}
                  popupVisible={popupVisible}
                />
              );
            })
          )}
        </div>
      </div>

      <AddOutlineEventDrawer
        open={addEvent}
        close={closeAddEventDrawer}
        onSubmit={AddData}
        isUpdate={false}
      />
    </div>
  );
};

export default OutlineCards;

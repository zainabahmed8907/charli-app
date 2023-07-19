import React, { useState } from "react";
import CustomButton from "../button/Button";
import CreateBookIcon from "../../assets/icons/create-book.svg";
import { useLocation, useParams } from "react-router-dom";

import AddbrainStormDrawer from "./AddBrainStormDrawer";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrainStorm,
  getBrainStorm,
  postBrainStorm,
  updateBrainStorm,
} from "../../redux/Slice/BrainStromSlice";
import { useEffect } from "react";
import FullPageSpinner from "../loader/FullPageSpinner";
import ListCard from "../ListCard";

const Content = ({ path_id, id, close }) => {
  const [updatebstorm, setUpdatebstorm] = useState(false);
  const dispatch = useDispatch();
  const updateData = (data) => {
    try {
      const payload = { id: id, data: data };
      dispatch(updateBrainStorm(payload));
      setTimeout(() => {
        dispatch(getBrainStorm(path_id));
      }, 1000);
      closeUpdateDrawer();
    } catch (e) {
      console.log(e);
    }
  };
  const delete_brainstorm = () => {
    dispatch(deleteBrainStorm({ id }));
    setTimeout(() => {
      dispatch(getBrainStorm(path_id));
    }, 100);
  };
  const openUpdateDrawer = () => {
    setUpdatebstorm(true);
  };
  const closeUpdateDrawer = () => {
    setUpdatebstorm(false);
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
          delete_brainstorm(id);
          close();
        }}>
          Delete
          <span className="ml-2">
            <i className="fa fa-times"></i>
          </span>
        </button>
      </div>
      <div style={{ marginTop: "20%" }}>
        <AddbrainStormDrawer
          bstormId={id}
          onSubmit={updateData}
          close={closeUpdateDrawer}
          open={updatebstorm}
          isUpdate={true}
        />
      </div>
    </div>
  );
};

const BrainStormCards = () => {
  const { id } = useParams();

  const [addEvent, setAddEventDrawer] = useState(false);
  const { bstorm, loading } = useSelector((state) => state.brainstorm);
  const dispatch = useDispatch();

  const closeAddEventDrawer = () => {
    setAddEventDrawer(false);
  };
  const showDrawer = () => {
    setAddEventDrawer(true);
  };

  const [openIndex, setOpenIndex] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

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
      dispatch(getBrainStorm(id));
    }
    return () => {
      wait = true;
    };
  }, []);

  const AddData = (data) => {
    dispatch(postBrainStorm({ data }));
    setTimeout(() => {
      dispatch(getBrainStorm(id));
    }, 100);
    closeAddEventDrawer(true);
  };

  return (
    <>
      <div className="main-container">
        <CustomButton
          type="primary"
          buttonTitle="Add BrainStorm"
          onClick={() => showDrawer()}
          icon={<img src={CreateBookIcon} alt="Button Icon" />}
        />
        <div className="card-container mt-2">
          <div
            className="p-3"
            style={{ maxHeight: "700px", overflowY: "auto" }}
          >
            {bstorm?.length == 0 ? (
              <h4 style={{ textAlign: "center" }}>
                No BrainStorm to display,Click on Add Brainstorm to add New Brainstorm
              </h4>
            ) : (
              bstorm?.length > 0 && bstorm?.map((b) => {
                return (
                  <ListCard
                  style={{
                    backgroundColor: b?.color_code,
                    color: b?.foreground_color,
                    cursor: 'pointer'
                  }}
             
                    id={b?.id}
                    name={b?.brainstorm_name}
                    description={b?.description}
                    content={<Content path_id={id} id={b.id} close={close} />}
                    pathname="brainstorm"
                    icon={b?.image_url}
                    book_id={id}
                    color_id={b?.color_id}
                    audio_file={b?.audio_file}
                    image_id={b?.image_id}
                    brainstorm_name={b?.brainstorm_name}
                    type="series"
                    open={() => {
                      open(b?.id)
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

        <AddbrainStormDrawer
          open={addEvent}
          close={closeAddEventDrawer}
          onSubmit={AddData}
          isUpdate={false}
        />
      </div>
    </>
  );
};

export default BrainStormCards;

import React, { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CustomButton from "../button/Button";
import CreateBookIcon from "../../assets/icons/create-book.svg";

import FullPageSpinner from "../../components/loader/FullPageSpinner";
import ListCard from "../ListCard";
import {
  deletePlotline,
  getPlotlineList,
  postPLotlineData,
  updatePlotline,
} from "../../redux/Slice/PlotlineSlice";
import PlotlineDrawer from "./AddPlotlineDrawer";
import PackageSubscriptionHook from "../PackageSubscriptionHook";
const Content = ({ path_id, id, close }) => {
  const [updateplotline, setUpdateplotline] = useState(false);
  const dispatch = useDispatch();

  const updateData = (data) => {
    try {
      const payload = { id: id, data: data };
      dispatch(updatePlotline(payload));
      setTimeout(() => {
        dispatch(getPlotlineList(path_id));
      }, 1000);
      closeUpdateDrawer();
    } catch (e) {
      console.log(e);
    }
  };
  const delete_plotline = (id) => {
    dispatch(deletePlotline({ id }));
    setTimeout(() => {
      dispatch(getPlotlineList(path_id));
    }, 1000);
  };
  const openUpdateDrawer = () => {
    setUpdateplotline(true);
  };
  const closeUpdateDrawer = () => {
    setUpdateplotline(false);
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
          delete_plotline(id);
          close();
        }}>
          Delete
          <span className="ml-2">
            <i className="fa fa-times"></i>
          </span>
        </button>
      </div>
      <div style={{ marginTop: "20%" }}></div>
      <PlotlineDrawer
        open={updateplotline}
        close={closeUpdateDrawer}
        onSubmit={updateData}
        isUpdate={true}
        plotlineId={id}
      />
    </div>
  );
};

const PlotlineCards = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [plotlineSubscription, setPlotlineSubscription] = useState(false);
  const ref = useRef();

  const [openIndex, setOpenIndex] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  //get plotlines from store
  const { plotlines, loading } = useSelector((state) => state.plotline);

  useEffect(() => {
    let wait = false;
    if (!loading && !wait) {
      dispatch(getPlotlineList(id));
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
    if (plotlineSubscription) {
      setAddEventDrawer(true);
    } else {
      ref?.current?.showModalAction();
    }
  };
  const AddData = (data) => {
    dispatch(postPLotlineData({ data }));
    closeAddEventDrawer(true);
    setTimeout(() => {
      dispatch(getPlotlineList(id));
    }, 1000);
  };
  if (loading) {
    return <FullPageSpinner />;
  }

  const checkSubscription = (action) => {
    setPlotlineSubscription(action);
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
        feature={"plot-planning-feature"}
        packageName={"plot-planning-feature"}
        ref={ref}
        title={"Plotline"}
        checkPackageSubscription={checkSubscription}
      />
      <CustomButton
        type="primary"
        buttonTitle={"New Plotline"}
        onClick={() => showDrawer()}
        icon={<img src={CreateBookIcon} alt="Button Icon" />}
      />
      <div className="card-container mt-2">
        <div className="p-3" style={{ maxHeight: "700px", overflowY: "auto" }}>
          {plotlines?.length === 0 ? (
            <h4 style={{ textAlign: "center" }}>
              No Plotline to display,Click on New Plotline Button to add New
              Plotline
            </h4>
          ) : (
            plotlines?.length > 0 &&
            plotlines?.map((plotline) => (
              <ListCard
                style={{
                  backgroundColor: plotline?.color_code,
                  color: plotline?.foreground_color,
                  cursor: 'pointer'
                }}
                foreground_color={plotline?.foreground_color}
                color_code={plotline?.color_code}
                id={plotline?.id}
                name={plotline?.plot_planner_title}
                description={plotline?.description}
                content={<Content path_id={id} id={plotline?.id} close={close} />}
                pathname="plotline"
                type="series"
                icon={plotline?.image_url}
                open={() => {
                  open(plotline?.id)
                }}
                openIndex={openIndex}
                popupVisible={popupVisible}
                handleOpenChange={handleOpenChange}
              />
            ))
          )}
        </div>
      </div>
      <PlotlineDrawer
        open={addEvent}
        close={closeAddEventDrawer}
        onSubmit={AddData}
        isUpdate={false}
        plotlineId={id}
      />
    </div>
  );
};

export default PlotlineCards;

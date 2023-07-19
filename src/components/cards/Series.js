import React, { useState, useEffect } from "react";

import "./index.scss";
import {
  deleteSeriesData,
  getSeriesData,
  updateSeries,
} from "../../redux/Slice/SeriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { UpdateSeriesDrawer } from "../UpdateSeriesDrawer";
import SeriesListing from "../SeriesListing";
import { useLocation } from "react-router-dom";

const Content = ({ id, close }) => {
  const [createBook, setCreateNewBook] = useState(false);
  const [cardStatus, setCardStatus] = useState(1);
  const dispatch = useDispatch();

  const onAddData = (data) => {
    try {
      const payload = { id: id, data: data };
      dispatch(updateSeries(payload));
      setTimeout(() => {
        dispatch(getSeriesData());
      }, 1000);

      closeDrawer();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteSeries = (sid) => {
    dispatch(deleteSeriesData(sid));
    setTimeout(() => {
      dispatch(getSeriesData());
    }, 1000);
  };
  const openDrawer = (status) => {
    setCardStatus(status);
    setCreateNewBook(true);
  };
  const closeDrawer = () => {
    setCreateNewBook(false);
  };

  return (
    <div>
      <div className="edit">
        <button
          onClick={() => {
            close();
            openDrawer();
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
          deleteSeries(id);
          close();
        }}>
          Delete
          <span className="ml-2">
            <i className="fa fa-times"></i>
          </span>
        </button>
      </div>
      <UpdateSeriesDrawer
        status={cardStatus}
        open={createBook}
        onSubmit={onAddData}
        close={closeDrawer}
        id={id}
      />
    </div>
  );
};

const SeriesCards = () => {
  const dispatch = useDispatch();

  const { loading, seriesData } = useSelector((state) => state.series);
  const [openIndex, setOpenIndex] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);

  const location = useLocation();


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
      dispatch(getSeriesData());
    }
    return () => {
      wait = true;
    };
  }, []);

  return (
    <div

    >
      <div className="card-container mt-2">
        <div className="p-3" style={{ maxHeight: "700px", overflowY: "auto" }}>
          {seriesData[0]?.length == 0 ? (
            <h4 style={{ textAlign: "center" }}>
              No Series to display,Click on Create New Series to add New Series
            </h4>
          ) :

            seriesData[0]?.length > 0 && seriesData[0]?.map((series => {
              return (
                <SeriesListing
                  style={{
                    backgroundColor: series?.color_code,
                    color: series?.foreground_color,
                    cursor: 'pointer'
                  }}
                  foreground_color={series?.foreground_color}
                  color_code={series?.color_code}
                  id={series?.id}
                  name={series?.series_name}
                  description={series?.series_description}
                  content={<Content id={series?.id} close={close} />}
                  pathname={location.pathname}
                  icon={series?.image_url}
                  open={() => {
                    console.log(series.id);
                    open(series?.id)
                  }}
                  openIndex={openIndex}
                  popupVisible={popupVisible}
                  handleOpenChange={handleOpenChange}

                />
              )
            }))

          }
        </div>
      </div>
  
    </div>
  );
};

export default SeriesCards;

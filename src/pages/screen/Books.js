import { Col, Row, message } from "antd";
import { useEffect, useState } from "react";

import CreateBookIcon from "../../assets/icons/create-book.svg";

import { ACTIVITY_LOGS } from "../../constant/constant";
import Books from "../../components/cards/Books";
import CustomButton from "../../components/button/Button";
import ActivityLog from "../../components/cards/ActivityLog";

import "./index.css";
import { CreateNewBookDrawer } from "../../components/CreateNewBookDrawer";
import { useDispatch, useSelector } from "react-redux";
import { getBookData, postBookData } from "../../redux/Slice/BookSlice";
import Vector from "../../assets/images/Group 178.png";
import SeriesCards from "../../components/cards/Series";
import { getSeriesData, postSeriesData } from "../../redux/Slice/SeriesSlice";
import { Link } from "react-router-dom";

const BooksandSeries = () => {
  const [displayName, setDisplayName] = useState("Alpha Doe");
  const [messageApi, contextHolder] = message.useMessage();
  const [createBook, setCreateNewBook] = useState(false);
  const [cardStatus, setCardStatus] = useState(1);

  const createNewBookDrawer = (status) => {
    setCardStatus(status);
    setCreateNewBook(true);
  };
  const closeCreateBookDrawer = () => {
    setCreateNewBook(false);
  };

  const { book_data } = useSelector((state) => state.books);
  const { seriesData } = useSelector((state) => state.series);
  const dispatch = useDispatch();

  const booksData = () => {
    dispatch(getBookData());
  };
  const series_Data = () => {
    dispatch(getSeriesData());
  };

  useEffect(() => {
    booksData();
    series_Data();
  }, [dispatch]);
  const [select, setSelect] = useState("");

  const options = [
    {
      value: "All Series",
      text: "All Series",
    },
    {
      value: "All Books",
      text: "All Books",
    },
  ];

  const booksContentSection = () => {
    return (
      <>
        <h2 className="sub-title">Start something new:</h2>
        <div>
          <CustomButton
            type="primary"
            buttonTitle={"Create New Series"}
            onClick={() => createNewBookDrawer(1)}
            icon={<img src={CreateBookIcon} alt="Button Icon" />}
          />
          <CustomButton
            buttonTitle={"Create New Book"}
            onClick={() => createNewBookDrawer(2)}
          />
          {/* <Link to="/brainstorm">
            <CustomButton buttonTitle={"Start Brain Storming"} />
          </Link> */}
        </div>
        <div className="mb-5">
          <div className="display-flex space-between">
            <h2 className="sub-title">Pick up where you left off:</h2>
            <p className="text-16 font-w-500 light-grey">Recent Updates</p>
          </div>
        </div>
        <div>
          <div className="display-flex space-between">
            {select === "All Books" ? (
              <h2 className="sub-title"> Your Books </h2>
            ) : (
              <h2 className="sub-title">Your Series</h2>
            )}
            <h2 className="sub-title-16 font-w-500 light-grey">View All</h2>
          </div>
          {select === "All Books"
            ?
            <Books />

            :
            <SeriesCards />
          }

        </div>
      </>
    );
  };

  const activityLogSection = () => {
    return (
      <>
        <div className="display-flex space-between ml-5 mr-5">
          <h2 className="sub-title">Activity log</h2>
          <h2 className="text-16 font-w-500 light-grey">View All</h2>
        </div>
        {ACTIVITY_LOGS.map((item, index) => (
          <ActivityLog {...item} key={index} />
        ))}
      </>
    );
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content:
        cardStatus == 1 ? "Series Add Successfully" : "Book Added Successfully",
    });
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Something went wrong",
    });
  };

  const onAddData = (data) => {
    try {
      if (cardStatus == 1) {
        dispatch(postSeriesData({ data }));
      } else {
        dispatch(postBookData({ data }));
        setTimeout(() => {
          dispatch(getBookData());
        }, 900);
      }
      closeCreateBookDrawer();
      success();
    } catch (e) {
      error();
    }
  };

  return (
    <>
      {contextHolder}
      <div className="main-container">
        <div className="display-flex">
          <div className="screen-title dark-black mr-3">
            Welcome back {displayName}
          </div>
          <div className="display-flex">
            <select
              onChange={(e) => setSelect(e.target.value)}
              value={select}
              defaultValue="All Books"
              placeholder="Select Book/Series"
              style={{
                border: "none",
                fontSize: "18px",
                fontWeight: "bolder",
                width: "150px",
                backgroundColor: "transparent",
              }}
            >
              {options.map((option) => (
                <option value={option.value}>{option.text}</option>
              ))}
            </select>
          </div>
        </div>
        <Row style={{ padding: "10px" }}>
          <div
            style={{
              position: "absolute",
              marginTop: "19px",
              marginLeft: "80%",
            }}
          >
            <img src={Vector} alt="bitmap" />
          </div>
        </Row>
        <Row className="card-container">
          <Col xs={24} sm={24} md={17} lg={17} xl={17} xxl={17}>
            <div
              className="left-section"
              style={{ maxHeight: "700px", overflowY: "auto" }}
            >
              {booksContentSection()}
            </div>
          </Col>
          <Col xs={24} sm={24} md={7} lg={7} xl={7} xxl={7}>
            <div className="activity-section">{activityLogSection()}</div>
          </Col>
        </Row>
      </div>
      <CreateNewBookDrawer
        status={cardStatus}
        onSubmit={onAddData}
        open={createBook}
        close={closeCreateBookDrawer}
      />
    </>
  );
};

export default BooksandSeries;

import { Col, Row, message } from "antd";
import { useEffect, useState } from "react";

import Task from "../../assets/icons/Task.svg";
import Flag from "../../assets/icons/Flag.svg";
import Lines from "../../assets/icons/Lines.svg";
import ArrowRight from "../../assets/icons/Arrow-Right.svg";
import CreateBookIcon from "../../assets/icons/create-book.svg";
import CurrentCard from "../../assets/icons/Onboarding/selected-onboarding.svg";
import OtherCard from "../../assets/icons/Onboarding/unselected-onboarding.svg";
import { Link } from "react-router-dom";
import {
  ACTIVITY_LOGS,
  ONBOARDING_CONTENT,
  TREND_TYPE,
} from "../../constant/constant";
import TrendCard from "../../components/cards/TrendCard";
import CustomButton from "../../components/button/Button";
import ActivityLog from "../../components/cards/ActivityLog";
import CustomModal from "../../components/modal/CustomModal";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getSeriesData, postSeriesData } from "../../redux/Slice/SeriesSlice";
import SeriesCards from "../../components/cards/Series";
import Vector from "../../assets/images/Vector.svg";
import { CreateNewBookDrawer } from "../../components/CreateNewBookDrawer";
import { getBookData, postBookData } from "../../redux/Slice/BookSlice";
import Books from "../../components/cards/Books";

const Shared = () => {
  const [displayName, setDisplayName] = useState("Alpha Doe");
  const [isModalVisible, setModalVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [createBook, setCreateNewBook] = useState(false);
  const [cardStatus, setCardStatus] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();

  const createNewBookDrawer = (status) => {
    setCardStatus(status);
    setCreateNewBook(true);
  };
  const closeCreateBookDrawer = () => {
    setCreateNewBook(false);
  };

  //dispatch function from redux for getting api data
  const dispatch = useDispatch();

  //getting series data

  const [onboardingArray] = useState(
    new Array(ONBOARDING_CONTENT.length).fill(0)
  );

  // const { data: bookList, isLoading: bookListLoading } = useGetBookListing();
  const cards = [
    {
      icon: Lines,
      header: "23 Tasks",
      text: "Completed this week",
      trend: "2 days",
      type: TREND_TYPE.POSITIVE,
    },
    {
      icon: Flag,
      header: "601",
      text: "Words written today",
      trend: "44",
      type: TREND_TYPE.POSITIVE,
    },
    {
      icon: Task,
      header: "#44",
      text: "Current Activity Ranking",
      trend: "1",
      type: TREND_TYPE.NEGATIVE,
    },
  ];

  const { seriesData } = useSelector((state) => state.series);
  const [select, setSelect] = useState("");

  const success = () => {
    messageApi.open({
      type: "success",
      content:
        cardStatus === 1
          ? "Series Add Successfully"
          : "Book Added Successfully",
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

  const series_data = () => {
    dispatch(getSeriesData());
  };
  const { book_data } = useSelector((state) => state.books);

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
  useEffect(() => {
    series_data();
  }, [dispatch]);

  const booksContentSection = () => {
    return (
      <>
        <h2 className="sub-title">Start something new:</h2>
        <div>
          <CustomButton
            buttonTitle={"Create New Series"}
            type={"primary"}
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
          {select === "All Books"
            ? book_data?.length > 0 &&
              book_data?.map((item) => {
                return item?.map((book, index) => (
                  <Books {...book} key={index} />
                ));
              })
            : seriesData?.length > 0 &&
              seriesData?.map((item) => {
                return item?.map((series, i) => (
                  <SeriesCards {...series} key={i} />
                ));
              })}
        </div>
        <div>
          {/* <div className="display-flex space-between">
            <h2 className="sub-title">Your Books:</h2>
            <h2 className="sub-title-16 font-w-500 light-grey">View All</h2>
          </div> */}
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

  return (
    <>
      <div className="main-container">
        <div className="display-flex">
          <div className="screen-title dark-black mr-3">Shared Works</div>
        </div>
        <Row>
          <div
            style={{
              position: "absolute",
              marginTop: "-16px",
              marginLeft: "80%",
            }}
          >
            <img src={Vector} alt="bitmap" />
          </div>
        </Row>
        <Row className="card-container mt-5">
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

export default Shared;

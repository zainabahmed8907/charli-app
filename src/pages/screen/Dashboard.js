import { Col, Row, message } from "antd";
import { useState } from "react";

import Task from "../../assets/icons/Task.svg";
import Lines from "../../assets/icons/Lines.svg";
import Chat from "../../assets/icons/chat.svg";
import ArrowRight from "../../assets/icons/Arrow-Right.svg";
import CreateBookIcon from "../../assets/icons/create-book.svg";
import CurrentCard from "../../assets/icons/Onboarding/selected-onboarding.svg";
import OtherCard from "../../assets/icons/Onboarding/unselected-onboarding.svg";
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
import { getBookofSeries, getSeriesData, postSeriesData } from "../../redux/Slice/SeriesSlice";
import SeriesCards from "../../components/cards/Series";
import Vector from "../../assets/images/Group 178.png";
import { CreateNewBookDrawer } from "../../components/CreateNewBookDrawer";
import { getBookData, postBookData } from "../../redux/Slice/BookSlice";
import Books from "../../components/cards/Books";
import { useEffect } from "react";
import { getColorData } from "../../redux/Slice/ColorSlice";
import PackageSubscriptionHook from "../../components/PackageSubscriptionHook";
import { useRef } from "react";


const Dashboard = () => {
  const [isModalVisible, setModalVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state?.auth);

  const user_name = user[0]?.user?.name;

  const [currentPage, setCurrentPage] = useState(0);
  const [createBook, setCreateNewBook] = useState(false);
  const [cardStatus, setCardStatus] = useState(1);


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
      icon: Task,
      header: "23 Tasks",
      text: "Completed this week",
      trend: "2 days",
      type: TREND_TYPE.POSITIVE,
    },
    {
      icon: Lines,
      header: "601",
      text: "Words written today",
      trend: "44",
      type: TREND_TYPE.POSITIVE,
    },
    {
      icon: Chat,
      header: "#44",
      text: "Total Comments",
      trend: "1",
      type: TREND_TYPE.NEGATIVE,
    },
  ];

  const [select, setSelect] = useState("");

  const onAddData = (data) => {
    try {
      if (cardStatus === 1) {
        dispatch(postSeriesData({ data }));
        setTimeout(() => {
          dispatch(getSeriesData());
        }, 900);
      } else {
        dispatch(postBookData({ data }));
        setTimeout(() => {
          dispatch(getBookData());
        }, 900);
      }
      closeCreateBookDrawer();
    } catch (e) {
      console.log("error", e);
    }
  };


  const options = [
    {
      value: "Activity Dashboard",
      text: "Activity Dashboard",
    },
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
    dispatch(getSeriesData());
    dispatch(getBookData());
    dispatch(getColorData());

    const modalShown = localStorage.getItem("isModalShown");
    if (modalShown == 'true') {
      setShowModal(true);
      localStorage.setItem("isModalShown", false);

    }

  }, []);
  const ref = useRef();
  const [seriesSubscription, setSubsscription] = useState(false);
  const [bookSubscription, setbookSubsscription] = useState(false);

  const checkSubscription = (action) => {
    setSubsscription(action);
  };
  const checkBookSubscription = (action) => {
    setbookSubsscription(action);
  };



  const booksContentSection = () => {
    return (
      <>
        <h2 className="sub-title">Start something new:</h2>
        <div style={{ marginTop: "-60px" }}>
          <PackageSubscriptionHook
            feature={"Series"}
            packageName={"feature"}
            ref={ref}
            title={""}
            checkPackageSubscription={checkSubscription}
          />
          {/* <PackageSubscriptionHook
            feature={"Book"}
            packageName={"book-feature"}
            ref={ref}
            title={"Book"}
            checkPackageSubscription={checkBookSubscription}
          /> */}
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

        </div>
        <div className="mb-5">
          <div className="display-flex space-between">
            <h2 className="sub-title">Pick up where you left off:</h2>
            <p className="text-16 font-w-500 light-grey">Recent Updates</p>
          </div>
          {select === "All Books"

            ? <Books />

            :
            <SeriesCards />
          }
        </div>
      </>
    );
  };

  const modalContent = (content) => {
    const { title, mainContent, icon, animation } = content;
    const btnCondition = currentPage < 5;
    return (
      <div className={`text-align-center ${animation}`}>
        <div className="text-34 font-w-700 black-color mt-0-3 mb-1">
          {title}
        </div>

        <div className={`${content?.style ?? "mh-240px"} black-color`}>
          <div className="onboarding-text mb-3">{mainContent}</div>
          {content?.subContents && (
            <div className="mb-3">
              {content.subContents?.map((item, index) => (
                <div className="onboarding-text mb-0-3" key={index}>
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {icon.map((item, index) => (
          <div className="mb-3" key={index}>
            <img src={item} alt="Onboarding Icon" />
          </div>
        ))}

        {content?.textIcons?.map((item, index) => (
          <img src={item} alt="text icon" key={index} />
        ))}

        <div className="display-flex justify-center  mt-2 mb-4">
          {content?.postIcons?.map((item, index) => (
            <img
              src={item}
              alt="post icon"
              key={index}
              className="mh-10px shadow"
            />
          ))}
        </div>

        <CustomButton
          buttonTitle={btnCondition ? "Next" : "Finish"}
          spacing="margin-0"
          verticalSpacing="mb-3"
          type="success"
          onClick={() => {
            btnCondition
              ? setCurrentPage((prev) => prev + 1)
              : setModalVisible(false);
          }

          }
        />
        <div
          className="text-12 font-w-600 underline mb-4 cursor"
          onClick={() => {
            setModalVisible(false);
          }}
        >
          Skip This
        </div>

        {onboardingArray?.map((_, index) => (
          <img
            src={currentPage === index ? CurrentCard : OtherCard}
            className={`${index != 0 ? "ml-4" : null} cursor`}
            alt="onboarding tabs"
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
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
      {showModal &&

        <CustomModal
          isVisible={isModalVisible}
          maskClosable={false}
          children={modalContent(ONBOARDING_CONTENT[currentPage])}
        />

      }
      <div className="main-container">

        <div className="display-flex">
          <div className="screen-title dark-black mr-3">
            Welcome back {user_name}
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
                width: "200px",
                backgroundColor: "transparent",
              }}
            >
              {options.map((option) => (
                <option value={option.value}>{option.text}</option>
              ))}
            </select>
          </div>
        </div>
        <Row justify="space-between" gutter={[16, 0]}>

          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} align="left">
            <div className="calender-card">
              <h1 className="white font-w-600 mt-2">Check</h1>
              <h1 className="white font-w-600 ">Calender</h1>
              <div className="display-flex space-between mt-4">
                <h6 className="white text-16 font-w-600">23/33 weekly Goals</h6>
                <img
                  src={ArrowRight}
                  className="icon-20"
                  alt="Arrow Right Icon"
                />
              </div>
            </div>
          </Col>
          {cards.map((item, index) => (
            <TrendCard {...item} key={index} />
          ))}
        </Row>
        <Row style={{ padding: "20px" }}>
          <div
            style={{
              position: "absolute",
              marginTop: "5px",
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

export default Dashboard;

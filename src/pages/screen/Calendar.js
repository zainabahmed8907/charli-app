import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Checkbox, Col, Form, Row } from "antd";
import Productivity from "../../assets/images/Productivity.svg";
import CalendarTab from "../../components/Calendar/CalendarTab";
import CalendarEventDrawer from "../../components/Calendar/CalendarEventDrawer";
import {
  getCalendarEvent,
  postCalendarEvent,
  postCalenderList,
} from "../../redux/Slice/CalendarSlice";
import { useDispatch, useSelector } from "react-redux";
import { getColorData } from "../../redux/Slice/ColorSlice";
import "../../components/Calendar/calendar.css";
import PackageSubscriptionHook from "../../components/PackageSubscriptionHook";
import { useParams } from "react-router-dom";

const Calendar = () => {
  const [addEvent, setAddEventDrawer] = useState(false);
  const [calendarSubscription, setCalendarSubscription] = useState(false);
  const ref = useRef();
  const { id } = useParams();
  const { calendar_list } = useSelector(state => state.calendar)
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const showDrawer = () => {
    if (calendarSubscription) {
      setAddEventDrawer(true);
    } else {
      ref?.current?.showModalAction();
    }
  };
  const closeEventDrawer = () => {
    setAddEventDrawer(false);
  };

  const checkSubscription = (action) => {
    setCalendarSubscription(action);
  };

  const addData = (data) => {
    dispatch(postCalendarEvent({ data }));

    dispatch(postCalenderList());

    closeEventDrawer();
  };
  useEffect(() => {
    dispatch(getColorData());
    dispatch(postCalenderList("21-03-2023", "22-03-2023"));
    console.log(calendar_list);

  }, []);

  console.log("ssssssss", calendarSubscription);

  return (
    <div className="main-container">
      <PackageSubscriptionHook
        feature={"goals-calendar-feature"}
        packageName={"calendar-feature"}
        ref={ref}
        title={"Calendar"}
        checkPackageSubscription={checkSubscription}
      />
      <Row>
        <Col sm={4} lg={4} xs={4} md={4}>
          <Card>
            <div className="calendar-col-1">
              <div>
                <Button type="primary" onClick={showDrawer}>
                  Add New
                </Button>
                <div className="filters mt-3">
                  <ul className="filter-list">
                    <li>
                      <Checkbox checked className="first" />
                      <span className="ml-2">Tag</span>
                    </li>
                    <li>
                      <Checkbox checked className="second" />
                      <span className="ml-2">Personal</span>
                    </li>
                    <li>
                      <Checkbox checked className="third" />
                      <span className="ml-2">Business</span>
                    </li>
                    <li>
                      <Checkbox checked className="forth" />
                      <span className="ml-2">Tag</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-5" id="productivity-image">
                <img src={Productivity} alt="productivity" />
              </div>
            </div>
          </Card>
        </Col>

        <Col sm={8} lg={20} xs={8} md={20}>
          <Card id="calendar-card" style={{ padding: 0 }}>
            <CalendarTab />
          </Card>
        </Col>
      </Row>
      <CalendarEventDrawer
        open={addEvent}
        close={closeEventDrawer}
        onSubmit={addData}
        isUpdate={false}
        form={form}
      />
    </div>
  );
};

export default Calendar;

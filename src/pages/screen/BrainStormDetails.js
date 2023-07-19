import React, { useState } from "react";
import { Row, Col, Card, Space, Button } from "antd";
import BTranscriptContainer from "../../components/brainstorm/BTranscriptContainer";
import BrainStormScale from "../../components/brainstorm/BrainStormScale";
import Menu from "../../assets/icons/menu.svg";
import BookNameOutline from "../../components/cards/outline-cards/book-name-outline/BookNameOutlineCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getSingleBrainsStorm } from "../../redux/Slice/BrainStromSlice";
import FullPageSpinner from "../../components/loader/FullPageSpinner";

const BrainstormDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { bs, loading } = useSelector((state) => state.brainstorm);
  const name = bs[0]?.data?.brainstorm_name;
  const desc = bs[0]?.data?.description;
  useEffect(() => {
    let wait = false;

    if (!loading && !wait) {
      dispatch(getSingleBrainsStorm(id));
    }
    return () => {
      wait = true;
    };
  }, []);

  if (loading) {
    return <FullPageSpinner />;
  }

  return (
    <div className="main-container">
      <BookNameOutline name={name} description={desc} />

      <Card
        style={{
          borderRadius: "8px",
          boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.06)",
          padding: "12px",
        }}
        className="mt-5"
      >
        <Row style={{ padding: "10px" }}>
          <Col sm={12} lg={4} xxl={4} xs={12} md={4}>
            <div className="d-flex">
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  background: "#93cd85",
                  borderRadius: "110px",
                }}
                className="mr-2"
              ></div>
              <Space size={"large"}>
                <p>Chapter 1</p>
                <img src={Menu} alt="menu-icon" />
              </Space>
            </div>
          </Col>
          <Col sm={12} lg={4} xxl={4} xs={12} md={4}>
            <div className="d-flex">
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  background: "#2DB6F5",
                  borderRadius: "110px",
                }}
                className="mr-2"
              ></div>
              <Space size={"large"}>
                <p className="">Chapter 2</p>
                <img src={Menu} alt="menu-icon" />
              </Space>
            </div>
          </Col>{" "}
          <Col sm={12} lg={4} xxl={4} xs={12} md={4}>
            <div className="d-flex">
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  background: "#D1A61D",
                  borderRadius: "110px",
                }}
                className="mr-2"
              ></div>
              <Space size={"large"}>
                <p className="">Chapter 3</p>
                <img src={Menu} alt="menu-icon" />
              </Space>
            </div>
          </Col>{" "}
          <Col sm={12} lg={4} xxl={4} xs={12} md={4}>
            <Button
              type="primary"
              size="small"
              style={{ cursor: "pointer", marginTop: "-5px" }}
            >
              Add New
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={24} xs={24} md={24} lg={24} xxl={24}>
            <BrainStormScale />
          </Col>
        </Row>
        <BTranscriptContainer />
      </Card>
    </div>
  );
};

export default BrainstormDetails;

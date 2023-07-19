import { Checkbox, Col, Row, Button } from "antd";
import React from "react";

import "./bstorm.css";
import Comment from "../../assets/images/Comment.png";
import Menu from "../../assets/icons/menu.svg";
const BTranscriptContainer = () => {
  return (
    <>
      <Row className="mt-3">
        <Col sm={24} xs={24} md={7} lg={7} xl={7}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="bs-rounds-list">
              <p className="brainstorm-rounds-heading">BrainStorm Rounds</p>

              <ul>
                <li>
                  <Checkbox
                    value="Round 1"
                    className="mr-1"
                  ></Checkbox>{" "}
                  Round 1
                </li>
                <li>
                  <Checkbox value="Round 2" className="mr-1"></Checkbox>Round 2
                </li>
                <li>
                  <Checkbox value="Round 3" className="mr-1"></Checkbox>Round 3
                </li>
                <li>
                  <Checkbox value="Round 4" className="mr-1"></Checkbox>Round 4
                </li>
              </ul>
              <ul className="add-rounds">
                <li>
                  <Checkbox
                    value="Round 1"
                    className="mr-1"
                  ></Checkbox>
                  Add another round
                </li>
              </ul>
            </div>
            <div className="br-list-line"></div>
          </div>
        </Col>

        <Col sm={24} xs={24} md={17} lg={17} xl={17}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="ts-heading">Transcript heading</p>
            <div className="d-flex">
              <img src={Comment} alt="Comment" className="mr-1" />
              <Button
                type="primary"
                danger
                style={{ height: "10px", padding: "10px" }}
                className="mr-3"
              >
                2 comments
              </Button>
              <img src={Menu} alt="menu-icon" />

            </div>
          </div>
          <div className="transcript-desc-container">
            <div className="transcript-desc-container--p1 mt-2">
              <p className="ts-time">- Tayma Tameem 01:23-02:23</p>
              <p className="mt-1">
                As the date draws nearer, then is suddenly changed, Zeina finds
                herself unsettled.{" "}
              </p>
              <p className="mt-1">
                A politcal marriage. An attempt at peace
                <br />
                flashbacks that might help connect these experiences.
              </p>
            </div>
            <div className="transcript-desc-container--p2 mt-2">
              <p className="ts-time">- Tayma Tameem 01:23-02:23</p>
              <p className="mt-1">
                As the date draws nearer, then is suddenly changed, Zeina finds
                herself unsettled.{" "}
              </p>
              <p className="mt-1">
                A politcal marriage. An attempt at peace
                <br />
                flashbacks that might help connect these experiences.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BTranscriptContainer;

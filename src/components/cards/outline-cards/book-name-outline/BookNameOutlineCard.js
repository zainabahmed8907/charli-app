import { Row, Col, Card, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Comment from "../../../../assets/images/Comment.png";
import Menu from "../../../../assets/icons/menu.svg";
const BookNameOutline = ({ name, title, description }) => {
  const outlineHeading = {
    fontWeight: 800,
    fontSize: "26px",
    lineHeight: "26px",
    letterSpacing: "-0.5px",
    marginBottom: "10px",
    fontfamily: "Inter SemiBold",
  };

  const outlineDesc = {
    fontSize: "14px",
    color: "#575A60",
    paddingBottom: "10px",
  };

  const outlineIcon = {
    fontWeight: "bold",
    marginTop: "-9px !important",
  };
  const outlinecardLink = {
    fontWeight: 400,
    fontSize: "14px",

    letterSpacing: "-0.02em",
    textDecoration: "underline",
    color: "#575A60",
  };

  const cardStyle = {
    boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.06)",
    borderRadius: "8px",
  };

  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card bordered={false} style={cardStyle}>
          <Row>
            <Col sm={12} xs={12} md={20} lg={20} xl={20}>
              <span
                style={{
                  fontWeight: "bolder",
                  fontSize: "15px",
                }}
              >
                <i class="fa-sharp fa-solid fa-chevron-left"></i>
              </span>
              <div className="ml-3" style={{ marginTop: "-25px" }}>
                <h1 style={outlineHeading}>
                  {name} {title ? ':' : ''} {title}
                </h1>
                <div
                  style={{
                    width: "80%",
                    paddingBottom: "10px",
                  }}
                >
                  <p style={outlineDesc}>{description}</p>
                  <p style={outlinecardLink}>
                    {/* <Link to="" className="link" style={outlinecardLink}> */}
                    Learn how to use this feature
                    {/* </Link> */}
                  </p>
                </div>
              </div>
            </Col>
            <Col sm={6} xs={6} md={4} lg={4} xl={4}>
              <div className="d-flex ml-2">
                <img src={Comment} alt="Comment" className="mr-1" />
                <Button
                  type="primary"
                  danger
                  style={{
                    height: "10px",
                    padding: "10px",
                    background: "#FF3742",
                  }}
                >
                  2 comments
                </Button>
                <div className="ml-5">
                  <img
                    src={Menu}
                    alt="menu-icon"
                    style={{
                      background: "#EBE9F1",
                      borderRadius: "15px",
                      width: "23px",

                      height: "30px",
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default BookNameOutline;

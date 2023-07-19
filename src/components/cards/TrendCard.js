import { Col } from "antd";

import RedArrow from "../../assets/icons/Red-Arrow.svg";
import GreenArrow from "../../assets/icons/Green-Arrow.svg";
import { TREND_TYPE } from "../../constant/constant";

import "./index.scss";

const TrendCard = ({ icon, header, text, trend, type }) => {
  return (
    <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6} align="center">
      <div className="trend-card">
        <div className="display-flex justify-right">
          <img
            src={type === TREND_TYPE.POSITIVE ? GreenArrow : RedArrow}
            alt="Trend Icon"
          />
          <p
            className={`text-18 font-w-600 ${
              type === TREND_TYPE.POSITIVE ? "green" : "red"
            }`}
          >
            {trend}
          </p>
        </div>
        <img src={icon} className="mt-2 mb-1 icon-30" alt="Stats Icon" />
        <h1 className="font-w-700 mb-1">{header}</h1>
        <h6 className="text-16 font-w-600 light-grey-2">{text}</h6>
      </div>
    </Col>
  );
};

export default TrendCard;

import React from "react";
import "./style.css";
import {
  HeartFilled,
  LikeFilled,
  DislikeFilled,
  QuestionOutlined,
} from "@ant-design/icons";
const ReactionsCard = () => {

  return (
    <div className="react-card">
      <ul>
        <li>
          <HeartFilled />
        </li>
        <li>
          <LikeFilled />
        </li>
        <li>
          <DislikeFilled />
        </li>
        <li>
          <QuestionOutlined />
        </li>
      </ul>
    </div>
  );
};

export default ReactionsCard;

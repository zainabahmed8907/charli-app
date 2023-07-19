import React from "react";
import { Button } from "antd";
import "./index.css";

const CustomButton = ({
  isLoading = false,
  onClick,
  disabled = false,
  buttonTitle,
  customStyle,
  type = "secondary",
  spacing = "mr-2",
  verticalSpacing = "mt-1 mb-5",
  ...rest
}) => {
  return (
    <Button
      {...rest}
      className={`${type}-ant-btn ${spacing} ${verticalSpacing}`}
      loading={isLoading}
      onClick={onClick}
      disabled={disabled}
    >
      {buttonTitle}
    </Button>
  );
};

export default CustomButton;

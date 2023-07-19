import { Spin } from "antd";
import React from "react";
import "./index.css";

function FullPageSpinner({ tip, size, className, indicator }) {
  return (
    <div className="loader">
      <Spin
        indicator={indicator ? indicator : undefined}
        size={size}
        tip={tip}
        spinning
      />
    </div>
  );
}

export default FullPageSpinner;

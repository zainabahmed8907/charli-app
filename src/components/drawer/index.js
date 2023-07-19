import React from "react";
import { Drawer } from "antd";

const CustomDrawer = (props) => {
  return <Drawer  {...props} width={530}>{props?.children}</Drawer>;
};
export default CustomDrawer;
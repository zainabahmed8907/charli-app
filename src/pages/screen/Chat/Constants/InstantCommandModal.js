import React, { useState } from "react";
import { instantCommand, pathItemsList } from "./DropdownList";
import { Modal } from "antd";

export const renderInstantModalView = (item) => {
  return (
    <div
      style={{
        flexDirection: "row",
        marginVertical: 10,
        marginHorizontal: 5,
        alignItems: "center",
      }}
    >
      <img src={instantCommand[item]?.icon} width={20} alt="" />
      <div style={{ colors: "black" }}>
        <h2>{instantCommand[item]?.title}</h2>
        <div style={{ colors: "gray" }}>
          <h6>{instantCommand[item]?.query}</h6>
        </div>
      </div>
    </div>
  );
};

export const InstantCommandModal = ({ open, hideModal }) => {
  return (
    <Modal
      className="instantCommnadModal"
      open={open}
      onOk={hideModal}
      onCancel={hideModal}
      maskClosable={false}
      width={300}
    >
      <div>
        {pathItemsList.map((path) => (
          <li>{path.label}</li>
        ))}
      </div>
    </Modal>
  );
};

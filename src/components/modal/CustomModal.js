import React, { useEffect } from "react";
import { Modal } from "antd";

const CustomModal = ({
  isVisible,
  maskClosable,
  onClose,
  width = 600,
  children,
}) => {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
  }, []);
  return (
    <Modal
      centered
      open={isVisible}
      maskClosable={maskClosable}
      closable={false}
      footer={null}
      onCancel={onClose}
      width={width}
      className="dashboard_modal"
    >
        {children}
    </Modal>
  );
};
export default CustomModal;

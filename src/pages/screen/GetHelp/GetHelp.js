import React from "react";
import CustomDrawer from "../../../components/drawer";
import "./getHelp.scss";
import { useState } from "react";
import { CloseOutlined, MailOutlined } from "@ant-design/icons";
import { Select, Input, Row, Col, Divider, Button } from "antd";
import { InboxOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info?.file;
    if (status !== "uploading") {
      console.log(info?.file, info?.fileList);
    }
    if (status === "done") {
      message.success(`${info?.file?.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const GetHelp = () => {
  const [showDrawer, setShowDrawer] = useState(true);
  const { Option } = Select;
  const { TextArea } = Input;

  const getDrawerContent = ({ setShowDrawer, showDrawer }) => {
    return (
      <div className="mb-2">
        <div className="d-flex">
          <div className="button-active"></div>
          <h2>Submit a Support Ticket</h2>

          <CloseOutlined
            className="close"
            onClick={() => setShowDrawer(!showDrawer)}
          />
        </div>
        <br />
        <p className="para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non
          quam fentum, consequat quam ac, mattis ex.
        </p>
        <br />

        <label className="label">
          Which best describes your reason for reaching out?
        </label>
        <Select style={{ width: "100%" }} defaultValue="Sales">
          <Option value="Sales">Sales</Option>
          <Option value="Company">Company</Option>
        </Select>

        <br />
        <br />

        <label className="label">What is your name ?</label>
        <Input.Group className="mt-1 mb-4">
          <Row gutter={24}>
            <Col span={12}>
              <Input prefix="First:" />
            </Col>
            <Col span={12}>
              <Input prefix="Last:"  />
            </Col>
          </Row>
        </Input.Group>
        <label className="label">What is your email ?</label>

        <Input
          className="mb-4 mt-1"
          prefix={<MailOutlined />}
          placeholder="youremail@domain.com"
        />

        <label className="label"> What is the level of urgency?</label>

        <Select style={{ width: "100%" }} defaultValue="Average" className="select_getHelp">
          <Option value="Average">Average</Option>
          <Option value="Below">Below</Option>
          <Option value="Below">low</Option>
        </Select>

        <label style={{ fontSize: "12px", color: "#202127" }}>
          Falsely attributing high urgency may affect your support priority.{" "}
        </label>
        <br />
        <br />
        <label className="label">Describe your issue</label>
        <TextArea
          className="text mb-4 mt-1"
          rows={4}
          placeholder="Please include any screenshots below if relevant"
          maxLength={6}
        />

        <label className="label">Click or Drag Files to Upload </label>
        <Dragger {...props} className="mt-1 mb-1 upload">
          <p className="ant-upload-drag-icon">
            <CloudUploadOutlined
              style={{ color: "rgba(139, 139, 139, 0.3)" }}
            />
          </p>
        </Dragger>
        <label className="upload-label">
          This is a description of the upload requirements.
        </label>
        <Divider />
        <Row gutter={24}>
          <Col span={12}>
            <Button className="change" type="primary" size="large">
              {" "}
              Submit
            </Button>
          </Col>
          <Col span={12}>
            <Button className="remove" type="outlined" size="large">
              {" "}
              Cancel{" "}
            </Button>
          </Col>
        </Row>
      </div>
    );
  };
  return (
    <div style={{ position: "relative" }} id="chat-main">
      <CustomDrawer
        getContainer={() => document.getElementById("chat-main")}
        className="chat-drawer"
        closable={false}
        open={showDrawer}
        placement="right"
      >
        {getDrawerContent({ setShowDrawer, showDrawer })}
      </CustomDrawer>
    </div>
  );
};

export default GetHelp;

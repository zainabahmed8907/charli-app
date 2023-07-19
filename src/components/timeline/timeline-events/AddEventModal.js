import { Form, Input, Modal, Select, Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getEventTypeList,
  postEventType,
} from "../../../redux/Slice/TimelineSlice";

const AddEventModal = ({ isModalOpen, handleCancel, handleOk, onSubmit }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { colors } = useSelector((state) => state.colors);
  const { id } = useParams();

  const SubmitEvents = (e) => {
    let data = { ...e };
    data.timeline_id = parseInt(id);
    form.resetFields();
    onSubmit(data);
    handleOk();
  };

  return (
    <>
      <Modal
        className="chapterModal"
        title="Add New Event"
        open={isModalOpen}
        onCancel={handleCancel}
        mask={false}
        width={350}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          position: "relative",
          marginTop: "12%",
          padding: "1.2rem",
          height: "20rem",
        }}
      >
        <Form
          layout="horizontal"
          initialValues={{
            remember: true,
          }}
          form={form}
          onFinish={SubmitEvents}
          autoComplete="off"
          className="gx-signin-form gx-form-row0"
          style={{
            maxWidth: 1000,
          }}
        >
          <Form.Item
            style={{ padding: ".5rem" }}
            label="Event Name"
            name="event_type"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ padding: ".5rem" }}
            label="Color"
            name="color_id"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: "Color is required",
              },
            ]}
          >
            <Select options={colors} placeholder="Select Color" />
          </Form.Item>
          <Form.Item style={{ padding: ".5rem" }}>
            <Button type="primary" htmlType="submit">
              Add Event
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddEventModal;

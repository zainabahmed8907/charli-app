import { DatePicker, Drawer, Form, Input, Select, TimePicker } from "antd";
import moment from "moment";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {  postCalenderList } from "../../redux/Slice/CalendarSlice";



const CalendarEventDrawer = ({
  open,
  close,
  onSubmit,
  isUpdate,
  id,
  startTime,
  endTime,
  eventDate,
  form,
  initialStartTime
}) => {
  const dispatch = useDispatch();

  const [forms] = Form.useForm();
  const handleSubmit = (e) => {
    let data = { ...e };
    data.start_time = moment(data.start_time).format("HH:mm:ss");
    data.end_time = moment(data.end_time).format("HH:mm:ss");
    data.event_date = moment(data.event_date).format("DD-MM-YYYY");


    onSubmit(data);
    setTimeout(() => {
      dispatch(postCalenderList());
    }, 900);
    form.resetFields();

  };

  const { colors } = useSelector((state) => state.colors);
  return (
    <Drawer
      title={isUpdate ? "Edit Event" : "Add Event"}
      placement="right"
      onClose={close}
      open={open}
      className="p-1 drawer"
      zIndex={0}
      autoFocus={false}
      mask={true}
    >
      <Form
        onFinish={handleSubmit}
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 24,
        }}
        layout="horizontal"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        className="gx-signin-form gx-form-row0"
        style={{
          maxWidth: 1000,
        }}
      >
        <Form.Item
          label="Title"
          labelCol={{ span: 24 }}
          name="title"
          rules={[
            {
              required: true,
              message: "Please Enter Event Title!",
            },
          ]}
        >
          <Input placeholder="Enter Event Name" />
        </Form.Item>

        <Form.Item
          label="Start Time"
          name='start_time'
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Please Enter Start Time!",
            },
          ]}
        >
          <TimePicker
            use12Hours={false}
            value={startTime}
          />
        </Form.Item>
        <Form.Item
          label="End Time"
          labelCol={{ span: 24 }}
          name="end_time"
          rules={[
            {
              required: true,
              message: "Please Enter End Time!",
            },
          ]}
        >
          <TimePicker
            use12Hours={false}
       />
        </Form.Item>

        <Form.Item
          label="Event Date"
          labelCol={{ span: 24 }}
          name="event_date"
          rules={[
            {
              required: true,
              message: "Please Enter Event Date!",
            },
          ]}
        >
          <DatePicker
          />
        </Form.Item>

        <Form.Item
          label="Event Location"
          labelCol={{ span: 24 }}
          name="location"
          rules={[
            {
              required: true,
              message: "Please Enter Location!",
            },
          ]}
        >
          <Input placeholder="Enter Event Location" />
        </Form.Item>

        <Form.Item
          label="colors"
          name="color_id"
          labelCol={{ span: 24 }}
          className="mb-3"
          rules={[
            {
              required: true,
              message: "Please Select a Color!",
            },
          ]}
        >
          <Select options={colors} placeholder="Select Color" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          labelCol={{ span: 24 }}
          className="mb-3"
          rules={[
            {
              required: true,
              message: "Please enter description",
            },
          ]}
        >
          <Input.TextArea placeholder="Enter Event Description" />
        </Form.Item>

        <div className="buttons-container mt-3 d-flex space-between">
          <button type="submit" className="mr-2" style={{ cursor: "pointer" }}>
            Save
          </button>
          <button type="ghost" onClick={close}>
            Cancel
          </button>
        </div>
      </Form>
    </Drawer>
  );
};

export default CalendarEventDrawer;

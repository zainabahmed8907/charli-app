import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const UpdateEventModal = ({ open, ok, cancel, onSubmit, id, event_id }) => {
  const { colors } = useSelector((state) => state.colors);
  const { events } = useSelector((state) => state.timeline);
  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    let data = { ...e };
    data.timeline_id = parseInt(id);
    onSubmit(data);
    form.resetFields();
  
  };

  const updateData =
    events?.length > 0 && events[0]?.find((event) => event.id === event_id);

  const eventType = updateData?.event_type;
  const color = updateData?.color_id;

  useEffect(() => {
    form.setFieldsValue({
      event_type: eventType,
      color_id: color,
    });
  }, []);

  return (
    <Modal
      className="chapterModal"
      title="Edit Chapter"
      open={open}
      onOk={ok}
      onCancel={cancel}
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
        onFinish={handleSubmit}
        form={form}
        autoComplete="off"
        className="gx-signin-form gx-form-row0"
        style={{
          maxWidth: 1000,
        }}
      >
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Name"
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
            Update Event
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateEventModal;

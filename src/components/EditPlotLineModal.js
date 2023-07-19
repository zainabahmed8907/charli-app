import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const EditPlotLineModal = ({
  open,
  ok,
  cancel,
  onSubmit,
  id,
  event_id,
  title,
  lineColor,
}) => {
  const { colors } = useSelector((state) => state.colors);

  const handleSubmit = (e) => {
    let data = { ...e };
    if (data.color_id == undefined) {
      let data = colors?.find((item) => item.color_code == lineColor);
      data.color_id = data.id;
    }
    const color = colors?.find(
      (item) => item.id == (data?.color_id?.id ?? data?.color_id)
    );
    data = { ...data, color_code: color?.color_code };
    onSubmit(data);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    const id = colors.find((item) => item.color_code == lineColor);
    form.setFieldsValue({
      event_type: title,
      color_id: id,
    });
  }, []);

  return (
    <Modal
      className="chapterModal"
      title="Edit Plotline"
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
          <Button type="primary" htmlType="submit" onClick={cancel}>
            Edit PlotLine
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPlotLineModal;

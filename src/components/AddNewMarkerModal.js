import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
const AddNewMarkerModal = ({ open, ok, cancel, onSubmit, plotLines }) => {
  const handleSubmit = (e) => {
    let data = { ...e };
    let result = plotLines.findIndex((item) => item.title == data.plotLine);
    data.selectedPlot = result;
    onSubmit(data);
  };

  const [plot, setPlot] = useState([]);

  const [form] = Form.useForm();

  useEffect(() => {
    let result = plotLines?.map((item, index) => {
      let data = { ...item, value: item.title, id: index };
      return data;
    });
    setPlot(result);
  }, []);

  return (
    <Modal
      className="chapterModal"
      title="Add New Marker"
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
          label="PlotLine"
          name="plotLine"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "PlotLine is required",
            },
          ]}
        >
          <Select options={plot} placeholder="Select PlotLine" />
        </Form.Item>
        <Form.Item style={{ padding: ".5rem" }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewMarkerModal;

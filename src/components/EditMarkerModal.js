import { Button, Form, Input, Modal, Select, Row, Col } from "antd";
import { useEffect, useState } from "react";
const EditMarkerModal = ({
  open,
  ok,
  cancel,
  onSubmit,
  title,
  plotLines,
  onDelete,
}) => {
  const [plot, setPlot] = useState([]);
  const [action, setAction] = useState("edit");
  const [marker, setMarker] = useState([]);

  const [form] = Form.useForm();

  const handleSubmit = (e) => {
    let data = { ...e };
    let result = plotLines.findIndex((item) => item.title == data.plotLine);
    let label = marker.findIndex((item) => item.value == data.marker);
    data.selectedPlot = result;
    data.selectedLabel = label;
    data.action = action;
    onSubmit(data);
  };

  const onSelectPlot = (e) => {
    let result = plotLines.find((item) => item.title == e);
    let markers = result?.data?.map((item, index) => {
      let data = { ...item, value: item.custom_label, id: index };
      return data;
    });
    setMarker(markers);
    form.setFieldsValue({
      marker: "",
    });
  };

  useEffect(() => {
    let result = plotLines?.map((item, index) => {
      let data = { ...item, value: item.title, id: index };
      return data;
    });
    let markers = result[0]?.data?.map((item, index) => {
      let data = { ...item, value: item.custom_label, id: index };
      return data;
    });
    setMarker(markers);
    setPlot(result);
  }, []);

  return (
    <Modal
      className="chapterModal"
      title="Edit Marker"
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
          <Select
            onSelect={(e) => onSelectPlot(e)}
            options={plot}
            placeholder="Select PlotLine"
          />
        </Form.Item>
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Marker"
          name="marker"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Marker is required",
            },
          ]}
        >
          <Select options={marker} placeholder="Select Marker" />
        </Form.Item>
        <Row style={{ justifyContent: "space-between" }}>
          <Form.Item style={{ padding: ".5rem" }}>
            <Button
              type="primary"
              onClick={() => setAction("edit")}
              htmlType="submit"
            >
              Edit
            </Button>
          </Form.Item>
          <Form.Item style={{ padding: ".5rem" }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => setAction("delete")}
            >
              Delete
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditMarkerModal;

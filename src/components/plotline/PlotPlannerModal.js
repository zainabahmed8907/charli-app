import { Button, Form, Input, Modal, Select } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PlotPlannerModal = ({
  isModalOpen,
  handleCancel,
  handleOk,
  isUpdate,
}) => {
  const { id } = useParams();
  const { colors } = useSelector((state) => state.colors);

  const SubmitPlotline = (e) => {
    const lineColor = colors.find((item) => item.id == e.color_id);
    const data = { ...e, lineColor: lineColor.color_code };
    data.plot_planner_id = parseInt(id);
    handleOk(data);
  };

  return (
    <Modal
      className="chapterModal"
      title={ "Add New Plotline"}
      open={isModalOpen}
      onCancel={handleCancel}
      mask={false}
      width={350}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        position: "relative",
        marginTop: "18%",
        padding: "1.2rem",
        height: "20rem",
      }}
    >
      <Form
        layout="horizontal"
        initialValues={{
          remember: true,
        }}
        onFinish={SubmitPlotline}
        autoComplete="off"
        className="gx-signin-form gx-form-row0"
        style={{
          maxWidth: 1000,
        }}
      >
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Plotline Name"
          name="plotline_title"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "plotline title is required",
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
            Add Plotline
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PlotPlannerModal;

import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChaptersList } from "../redux/Slice/ChapterSlice";
const UpdateChapterModal = ({ open, ok, cancel, onSubmit, id, chapter_id }) => {
  const { colors } = useSelector((state) => state.colors);
  const { allChapters } = useSelector((state) => state.chapters);

  const handleSubmit = (e) => {
    let data = { ...e };
    data.outline_id = parseInt(id);
    onSubmit(data);
  };

  const [form] = Form.useForm();

  const updateData =
    allChapters[0]?.data?.length > 0 &&
    allChapters[0]?.data?.filter((c) => c.id === chapter_id);
  const name = updateData[0]?.chapter_name;
  const color = updateData[0]?.color_id;

  useEffect(() => {
    form.setFieldsValue({
      chapter_name: name,
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
          label="Chapter Name"
          name="chapter_name"
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
            Update Chapter
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateChapterModal;

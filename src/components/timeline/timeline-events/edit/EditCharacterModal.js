import { Button, Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCharacters } from "../../../../redux/Slice/CharacterSlice";

const EditCharacterModal = ({isModalOpen,handleCancel,handleOk,char_id,onSubmit}) => {
  const { id } = useParams();
  const { characters } = useSelector((state) => state.character);
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const SubmitCharacter = (e) => {
    const data = { ...e };
    data.timeline_id = parseInt(id);
    onSubmit(data);
    handleOk();
    form.resetFields();

  };
  const updateChar =
    characters?.length > 0 &&
    characters?.find((character) => character.id === char_id);
  const characterName = updateChar?.character_name;
  useEffect(() => {
    form.setFieldsValue({
      character_name: characterName,
    });
  }, []);

  return (
    <Modal
      className="chapterModal"
      title={"Update Character"}
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
        onFinish={SubmitCharacter}
        autoComplete="off"
        className="gx-signin-form gx-form-row0"
        style={{
          maxWidth: 1000,
        }}
        form={form}
      >
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Character Name"
          name="character_name"
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

        <Form.Item style={{ padding: ".5rem" }}>
          <Button type="primary" htmlType="submit">
            Add Event
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCharacterModal;

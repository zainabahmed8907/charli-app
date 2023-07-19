import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCharacters,
  postCharacter,
} from "../../../redux/Slice/CharacterSlice";
import { getTimeline } from "../../../redux/Slice/TimelineSlice";

const CharacterModal = ({ isModalOpen, handleCancel, handleOk, isUpdate }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const SubmitCharacter = (e) => {
    const data = { ...e };
    data.timeline_id = parseInt(id);

    dispatch(postCharacter({ data }));
    setTimeout(() => {
      dispatch(getCharacters(id));
      dispatch(getTimeline(id));
    }, 1000);

    form.resetFields();

  };

  return (
    <Modal
      className="chapterModal"
      title={isUpdate ? "Edit Character" : "Add New Character"}
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
        form={form}
        onFinish={SubmitCharacter}
        autoComplete="off"
        className="gx-signin-form gx-form-row0"
        style={{
          maxWidth: 1000,
        }}
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
          <Button type="primary" htmlType="submit" onClick={handleOk}>
            Add Character
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CharacterModal;

import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postEventBlock,
  updateEventBlock,
  deleteEventBlock,
} from "../../../../redux/Slice/EventBlockSlice";
import "./eventblock.css";
import { useParams } from "react-router-dom";
import { getTimeline } from "../../../../redux/Slice/TimelineSlice";

export const AddEventBlockModal = ({ isModalOpen, handleCancel, handleOk }) => {
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.timeline);
  const { timeline } = useSelector((state) => state.timeline);

  const timelineCharacters =
    timeline?.length > 0 &&
    timeline[0]?.data?.timeline_characters?.map((c) => c);

  const { outlineData } = useSelector((state) => state.outline);
  const { id } = useParams();

  const [form] = Form.useForm();

  const SubmitEventBlock = (e) => {
    const data = { ...e };
    console.log(data);
    dispatch(postEventBlock({ data }));
    form.resetFields();
    handleOk();
    setTimeout(() => {
      dispatch(getTimeline(id));
    }, 1000);
  };

  return (
    <Modal
      className="chapterModal"
      title="New Event Block"
      open={isModalOpen}
      onCancel={handleCancel}
      mask={false}
      width={400}
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
        onFinish={SubmitEventBlock}
        autoComplete="off"
        className="gx-signin-form gx-form-row0"
        style={{
          maxWidth: 1000,
        }}
      >
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Select Event"
          name="event_type_id"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Select
            options={
              events[0]?.length > 0 &&
              events[0]?.map((t) => ({
                label: t?.event_type,
                value: t?.id,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Event Name"
          name="event_name"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input placeholder="Enter Event Name" />
        </Form.Item>
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Event Description"
          name="event_description"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Description is required",
            },
          ]}
        >
          <Input.TextArea placeholder="Enter Event Description" />
        </Form.Item>

        <Form.Item
          style={{ padding: ".5rem" }}
          label="Select Character"
          name="timeline_character_id"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Select
            options={
              timelineCharacters?.length > 0 &&
              timelineCharacters?.map((t) => ({
                label: t?.character_name,
                value: t?.id,
              }))
            }
          />
        </Form.Item>

        <Form.Item
          style={{ padding: ".5rem" }}
          label="Select Outline"
          name="outline_id"
          labelCol={{ span: 24 }}
          // rules={[
          //   {
          //     required: true,
          //     message: "Event Block is required",
          //   },
          // ]}
        >
          <Select
            options={outlineData?.map((t) => ({
              label: t?.outline_name,
              value: t?.id,
            }))}
          />
        </Form.Item>

        <Form.Item style={{ padding: ".5rem" }}>
          <Button type="primary" htmlType="submit">
            Add Event Block
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export const EditEventBlockModal = ({
  isModalOpen,
  handleCancel,
  handleOk,
  block,
}) => {
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.timeline);
  const { outlineData } = useSelector((state) => state.outline);
  const { timeline } = useSelector((state) => state.timeline);

  const [blockId, setBlockId] = useState();
  const { id } = useParams();

  const [form] = Form.useForm();
  const timelineCharacters =
    timeline?.length > 0 &&
    timeline[0]?.data?.timeline_characters?.map((c) => c);
  const [eventList, setEventList] = useState();

  const onSelectCharacter = (e) => {
    let result = timelineCharacters?.find((item) => item?.id == e);
    let ev = result?.blocks?.map((item, index) => {
      let data = { ...item, value: item.event_name, id: item?.id };
      return data;
    });
    setEventList(ev);
  };

  const onSelectEvent = (e) => {
    setBlockId(e);
  };

  const SubmitEventBlock = (e) => {
    const data = { ...e };
    const payload = { id: blockId, data: data };
    dispatch(updateEventBlock(payload));
    form.resetFields();
    setTimeout(() => {
      dispatch(getTimeline(id));
      handleOk();
    }, 1000);
  };

  const deleteBlock = () => {
    dispatch(deleteEventBlock(blockId));
    setTimeout(() => {
      dispatch(getTimeline(id));
    }, 1000);
    form.resetFields();
  };
  // const updateBlock = blocks[0]?.length > 0 && blocks[0]?.filter(b => b.id === blockId);

  // useEffect(() => {
  //   form.setFieldsValue({
  //     event_name: updateBlock[0]?.event_name,
  //     event_description: updateBlock[0]?.event_description
  //   })
  // }, []);

  return (
    <Modal
      className="chapterModal"
      title="Edit Event Block"
      open={isModalOpen}
      onCancel={handleCancel}
      mask={false}
      width={400}
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
        onFinish={SubmitEventBlock}
        autoComplete="off"
        className="gx-signin-form gx-form-row0"
        style={{
          maxWidth: 1000,
        }}
      >
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Select Character"
          name="timeline_character_id"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Select
            onSelect={(e) => onSelectCharacter(e)}
            options={
              timelineCharacters?.length > 0 &&
              timelineCharacters?.map((t) => ({
                label: t?.character_name,
                value: t?.id,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Select Event Block"
          name="block_id"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Event Block is required",
            },
          ]}
        >
          <Select
            onChange={(e) => onSelectEvent(e)}
            options={eventList?.map((t) => ({
              label: t?.event_name,
              value: t?.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          style={{ padding: ".5rem" }}
          label="Select Event"
          name="event_type_id"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Select
            options={
              events[0]?.length > 0 &&
              events[0]?.map((t) => ({
                label: t?.event_type,
                value: t?.id,
              }))
            }
          />
        </Form.Item>
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Event Name"
          name="event_name"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Event Name is required",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{ padding: ".5rem" }}
          label="Event Description"
          name="event_description"
          labelCol={{ span: 24 }}
          rules={[
            {
              required: true,
              message: "Event Description is required",
            },
          ]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>
        <Form.Item
          style={{ padding: ".5rem" }}
          label="Select Outline"
          name="outline_id"
          labelCol={{ span: 24 }}
        >
          <Select
            options={
              outlineData?.length > 0 &&
              outlineData?.map((t) => ({
                label: t?.outline_name,
                value: t?.id,
              }))
            }
          />
        </Form.Item>

        <Form.Item style={{ padding: ".5rem" }}>
          <Button type="primary" htmlType="submit" onClick={handleOk}>
            Update Event Block
          </Button>
        </Form.Item>
        <Button
          onClick={() => {
            deleteBlock();
            handleOk();
          }}
        >
          Delete
        </Button>
      </Form>
    </Modal>
  );
};

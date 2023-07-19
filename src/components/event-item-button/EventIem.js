import { Modal, Form, Input, Select, Button } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  getChapterCards,
  postChapterCards
} from '../../redux/Slice/ChapterCardsSlice';
import { getChapters } from '../../redux/Slice/ChapterSlice';
import './eventbutton.css';
const EventItemCard = ({ event_id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading } = useSelector((state) => state.chaptercard);
  const { id } = useParams();
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { colors } = useSelector((state) => state.colors);
  const dispatch = useDispatch();

  const SubmitCard = (e) => {
    let data = { ...e };
    data.chapter_id = parseInt(event_id);
    form.resetFields();
    handleCancel();
    dispatch(postChapterCards({ data }));
    setTimeout(() => {
      dispatch(getChapters(id));
      dispatch(getChapterCards());
    }, 1000);
  };

  return (
    <>
      <button
        className="button mt-3"
        style={{ textAlign: 'center', width: '100%' }}
        onClick={showModal}
        id={id}
      >
        New Event Item
      </button>
      <Modal
        className="chapterModal"
        title="Add New Card"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        mask={false}
        width={350}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative',
          marginTop: '12%',
          padding: '1.2rem',
          height: '10rem'
        }}
      >
        <Form
          form={form}
          layout="horizontal"
          initialValues={{
            remember: true
          }}
          onFinish={SubmitCard}
          autoComplete="off"
          className="gx-signin-form gx-form-row0"
          style={{
            maxWidth: 1000
          }}
        >
          <Form.Item
            style={{ padding: '.5rem' }}
            label="Title"
            name="card_title"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Name is required'
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            style={{ padding: '.5rem' }}
            label="Color"
            name="color_id"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Color is required'
              }
            ]}
          >
            <Select options={colors} placeholder="Select Color" />
          </Form.Item>
          <Form.Item
            style={{ padding: '.5rem' }}
            label="Description"
            name="card_description"
            labelCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Description is required'
              }
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item style={{ padding: '.5rem' }}>
            <Button type="primary" htmlType="submit">
              Add card
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EventItemCard;

import {
  Space,
  Col,
  Row,
  Input,
  Button,
  Form,
  Select,
  Modal,
  Popover
} from 'antd';
import React, { useState } from 'react';

import OutlineChapterCard from '../../components/cards/outline-cards/outline-chapter/OutlineChapterCard';
import face1 from '../..//assets/images/face-1.jpg';
import face2 from '../../assets/images/face-2.jpg';
import face3 from '../../assets/images/face-3.jpg';
import Menuu from '../../assets/icons/menu.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import OutlineSideModal, {
  TodoModal
} from '../../components/outline-side-modal/OutlineEventDrawer';
import EventItemCard from '../../components/event-item-button/EventIem';

import {
  deleteChapter,
  getChapters,
  postChapters,
  updateChapter
} from '../../redux/Slice/ChapterSlice';
import BookNameOutline from '../../components/cards/outline-cards/book-name-outline/BookNameOutlineCard';
import { useParams } from 'react-router-dom';
import '../../components/outline-side-modal/outlinemodal.css';
import UpdateChapterModal from '../../components/UpdateChapterModal';
import FullPageSpinner from '../../components/loader/FullPageSpinner';
import { getOutline } from '../../redux/Slice/OutlineSlice';
import {
  deleteChapterCard,
  getChapterCards,
  updateChapterCard
} from '../../redux/Slice/ChapterCardsSlice';

const Content = ({ c_id, close }) => {
  // const { chapters } = useSelector((state) => state.chapters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  const deletechapter = (cid) => {
    dispatch(deleteChapter(cid));
    setTimeout(() => {
      dispatch(getChapters(id));
    }, 1000);
    close();
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const EditChapter = (data) => {
    try {
      const payload = { id: c_id, data: data };
      dispatch(updateChapter(payload));
      setTimeout(() => {
        dispatch(getChapters(id));
        dispatch(getChapterCards(c_id));
      }, 1000);
      close();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className="edit">
        <button
          onClick={(e) => {
            e.preventDefault();
            showModal();
          }}
        >
          Edit
          <span className="ml-2">
            <i className="fa fa-check"></i>
          </span>
        </button>
      </div>

      <div className="delete-btn">
        <button onClick={() => deletechapter(c_id)}>
          Delete
          <span className="ml-2">
            <i className="fa fa-times"></i>
          </span>
        </button>
      </div>
      <UpdateChapterModal
        open={isModalOpen}
        ok={handleOk}
        cancel={handleCancel}
        onSubmit={EditChapter}
        id={id}
        chapter_id={c_id}
      />
    </div>
  );
};

const EditContent = ({ c_id, close, tasks }) => {
  const { loading } = useSelector((state) => state.chaptercard);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todomodal, settodoModal] = useState(false);
  const { id } = useParams();

  const showTodoModal = () => {
    close();
    settodoModal(true);
  };

  const cancelTodoModal = () => {
    settodoModal(false);
    close();
  };

  const dispatch = useDispatch();

  const deletechapter = (cid) => {
    dispatch(deleteChapterCard(cid));
    setTimeout(() => {
      dispatch(getChapters(id));
    }, 1000);
    close();
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const EditCard = (data) => {
    try {
      const payload = { id: c_id, data: data };
      dispatch(updateChapterCard(payload));
      setTimeout(() => {
        dispatch(getChapters(id));
      }, 1000);

      close();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className="edit">
        <button
          onClick={(e) => {
            showModal();
            close();
          }}
        >
          Edit
          <span className="ml-2">
            <i className="fa fa-check"></i>
          </span>
        </button>
      </div>
      <div className="edit">
        <button
          onClick={(e) => {
            e.preventDefault();
            close();
            showTodoModal();
          }}
        >
          Insert Todos
          <span className="ml-2">
            <i className="fa fa-check"></i>
          </span>
        </button>
      </div>

      <div className="delete-btn">
        <button onClick={() => deletechapter(c_id)}>
          Delete
          <span className="ml-2">
            <i className="fa fa-times"></i>
          </span>
        </button>
      </div>
      <OutlineSideModal
        open={isModalOpen}
        close={handleCancel}
        onsubmit={EditCard}
        chapterCardId={c_id}
      />
      <TodoModal
        tasks={tasks}
        open={todomodal}
        close={cancelTodoModal}
        cardId={c_id}
      />
    </div>
  );
};
const OutlineDetail = () => {
  const avatar = [
    {
      id: 1,
      imgName: face1
    },
    {
      id: 2,
      imgName: face2
    },
    {
      id: 3,
      imgName: face3
    }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(false);

  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    SubmitChapters();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { id } = useParams();
  const { outline } = useSelector((state) => state.outline);
  const { colors } = useSelector((state) => state.colors);
  const { chapters } = useSelector((state) => state.chapters);
  const { loading } = useSelector(state => state.chaptercard);
  
  const title = outline[0]?.data?.outline_title;
  const name = outline[0]?.data?.outline_name;
  const desc = outline[0]?.data?.description;

  const [form] = Form.useForm();
  const SubmitChapters = (e) => {
    let data = { ...e };
    data.outline_id = parseInt(id);
    dispatch(postChapters({ data }));
    setTimeout(() => {
      dispatch(getChapters(id));
    }, 100);
    form.resetFields();
  };

  useEffect(() => {

    dispatch(getChapters(id));
    dispatch(getOutline(id));

  }, []);

  const close = () => {
    setPopupVisible(false);
  };

  const open = (index) => {
    setPopupVisible(true);
    setOpenIndex(index);
  };

  return (
    <div className="main-container">
      <BookNameOutline title={title} name={name} description={desc} />

      <Row gutter={24}>
        {chapters[0]?.data?.chapters?.length > 0 &&
          chapters[0]?.data?.chapters?.map((c) => (
            <Col sm={12} xs={12} lg={6} md={6} xl={6}>
              <div className="chapter-name  mt-4 mb-3">
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div className="d-flex">
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        background: c.color_code,
                        borderRadius: '110px'
                      }}
                      className="mr-2"
                    ></span>
                    <p style={{ color: 'black', fontWeight: 'bold' }} id={c?.id}>
                      {c?.chapter_name}
                    </p>
                  </div>

                  <Popover
                    open={c?.id == openIndex && popupVisible}

                    id={c?.id}
                    popupVisible={false}
                    placement="right"
                    content={<Content c_id={c?.id} path_id={id} close={close} />}
                    title="Actions"
                    trigger="click"
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={Menuu} alt="Menu Icon" id={c?.id} onClick={() => open(c?.id)}
                    />
                  </Popover>
                </div>
              </div>
              {c?.cards?.map((card) => {
                return (
                  <>
                    <Popover
                      open={card?.id == openIndex && popupVisible}
                      content={
                        <EditContent
                          tasks={card?.tasks}
                          close={close}
                          c_id={card?.id}
                          chapterId={c?.id}
                          path_id={id}
                        />
                      }
                      popupVisible={false}
                      trigger="click"
                      placement="right"
                      style={{ cursor: 'pointer' }}

                    >

                      <div>
                        {loading ? <FullPageSpinner /> : <OutlineChapterCard
                          id={card?.id}
                          open={() => open(card?.id)}
                          pill={card?.card_title}
                          desc={card?.card_description}
                          color={card?.foreground_color}
                          bgcolor={card?.color_code}
                          sent="1"
                          comments="5"
                          avatar={avatar}
                        />}
                      </div>
                    </Popover>
                  </>
                );
              })}
              <EventItemCard event_id={c?.id} />
            </Col>
          ))}
        <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
          <Button onClick={showModal} className="mt-4">
            <Space>New Chapter</Space>
          </Button>
          <Modal
            className="chapterModal"
            title="Add New Chapter"
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
              height: '20rem'
            }}
          >
            <Form
              layout="horizontal"
              initialValues={{
                remember: true
              }}
              form={form}
              onFinish={SubmitChapters}
              autoComplete="off"
              className="gx-signin-form gx-form-row0"
              style={{
                maxWidth: 1000
              }}
            >
              <Form.Item
                style={{ padding: '.5rem' }}
                label="Chapter Name"
                name="chapter_name"
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
              <Form.Item style={{ padding: '.5rem' }}>
                <Button type="primary" htmlType="submit" onClick={handleCancel}>
                  Add Chapter
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default OutlineDetail;

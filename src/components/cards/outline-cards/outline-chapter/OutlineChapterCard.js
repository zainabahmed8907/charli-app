import { Card } from 'antd';
import React, { useState } from 'react';
import './outline-chapter.css';
import AttachmentIcon from '../../../controls/icons/attachment-icon/AttachmentIcon';
import Comment from '../../../../assets/icons/OutlineComment.png';

import Menuu from '../../../../assets/icons/menu.svg';
import { useEffect } from 'react';
import { apiServices } from '../../../../services/apiServices/Api';
import { PlusSquareOutlined } from '@ant-design/icons';

const OutlineChapterCard = ({
  pill,
  desc,
  avatar,
  cardphoto,
  viewCard,
  bgcolor,
  color,
  id,
  open,
  tasks
}) => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await apiServices.get(
        `https://charliiapp.clickysoft.net/api/v1/card-tasks-list/${id}`,
        {}
      );

      const data = response.data;
      setTodos(data);
      return data;
    } catch (err) {
      console.log('err while getting todos', err);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <Card
        style={{
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        className="mt-2"
        onClick={viewCard}
      >
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1
            }}
          >
            <p
              style={{ backgroundColor: bgcolor, color: color }}
              id="tag"
              className="mb-1"
            >
              {pill}
            </p>
            <img onClick={open} src={Menuu} alt="Menu Icon" id={id} />
          </div>

          <p id="desc">{desc}</p>
          <div className="todos">
            {todos?.length > 0 &&
              todos.map((todo) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="mr-1">
                    <PlusSquareOutlined />
                  </span>{' '}
                  <p className="mt-1" style={{ fontWeight: 'bold' }}>
                    {' '}
                    {todo?.todo_item}
                  </p>
                </div>
              ))}
          </div>
          <div className="mb-1">
            {cardphoto && (
              <img src={cardphoto} alt="cardpicture" id="cardphoto" />
            )}
          </div>
          <div className="d-flex justify-between">
            <div className="card-icons mt-2 d-flex ">
              <div className="d-flex">
                <AttachmentIcon />
                <p className="mr-2">1</p>
              </div>
              <div className="d-flex">
                <img src={Comment} alt="comment" />
                <p>2</p>
              </div>
            </div>
            <div className="avatars d-flex ml-5 mt-2">
              {avatar.map((a) => {
                return (
                  <div key={a.id} id={a.id} className="img-frame">
                    <img src={a.imgName} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default OutlineChapterCard;

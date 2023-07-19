import React from "react";
import { Popover, Tag } from "antd";

import Menu from "../assets/icons/menu.svg";
import Share from "../assets/icons/share.svg";
import Message from "../assets/icons/message.svg";
import WebIcon from "../assets/icons/web-icon.svg";

import "./cards/index.scss";
import { getTimeDuration } from "../services/utilServices";
import { Link } from "react-router-dom";
import newbook from '../assets/images/newbook.png';
const ListCard = ({
  icon,
  name,
  description,
  updated,
  content,
  id,
  color_code,
  foreground_color,
  pathname,
  book_id,
  color_id,
  audio_file,
  brainstorm_name,
  image_id,
  open,
  openIndex,
  popupVisible,
  type,
  style,
  handleOpenChange
}) => {
  const data = {
    brainstorm_name,
    description,
    id,
    color_code,
    book_id,
    color_id,
    audio_file,
    image_id,
  };
 
  return (
    <div
      className="book-card-container"
      id={id}
      style={style}
    >
      <div className="display-flex space-between">
        <div>
          <img src={Share} className="mr-1 align-center" alt="Share Icon" />
          <span className="thin-text-13 mr-2">Shared by:</span>
          <img src={WebIcon} className="mr-1" alt="Web Icon" />
          <span className="bold-text-13">Shana Tenerths</span>
        </div>
        <div>
          <img src={Message} className="mr-2" alt="Message Icon" />
          <Tag className="bold-white-text-11">2 Comment</Tag>
          <Popover
            popupVisible={false}
            placement="right"
            content={content}

            open={id == openIndex && popupVisible}

            title="Actions"
            trigger="click"
            style={{ cursor: "pointer" }}
            onOpenChange={handleOpenChange}

          >
            <img src={Menu} alt="Menu Icon" onClick={open} id={id} />
          </Popover>
        </div>
      </div>
      {type == "series" &&
        <Link
          to={{
            pathname: `/${pathname}/${id}`,
            state: { data: data },
          }}

        >

          <div className="display-flex mt-2">
            <img
              src={icon?.length > 0 ? icon : newbook}
              className="mr-3 self-start"
              alt="Book or Series Icon"
              width="70"
              height="70"
            />
            <div>
              <h2 className="sub-title-16 font-w-800 mb-0-3">{name}</h2>
              <h4 className="thin-text-13" style={{ lineHeight: 1.5 }}>{description}</h4>
              <p>{audio_file}</p>
              <div className="display-flex mt-2">
                <p className="thin-text-13 mr-2">
                  Updated: {getTimeDuration(updated)}
                </p>
                <p className="thin-text-13 underline mr-2">Brainstorm</p>
                <p className="thin-text-13 underline mr-2">Outline</p>
                <p className="thin-text-13 underline mr-2">PLotline</p>
              </div>
            </div>
          </div>
          {/* {type == "series" &&
        </Link>
      } */}
        </Link>
      }
      {type == "book" &&




        <div className="display-flex mt-2" >
          <img
            src={icon?.length > 0 ? icon : newbook}
            className="mr-3 self-start"
            alt="Book or Series Icon"
            width="70"
            height="70"
          />

          <div>
            <h2 className="sub-title-16 font-w-800 mb-0-3">{name}</h2>
            <h4 className="thin-text-13" style={{ lineHeight: 1.5 }}>{description}</h4>
            <p>{audio_file}</p>
            <div className="display-flex mt-2">
              <p className="thin-text-13 mr-2">
                Updated: {getTimeDuration(updated)}
              </p>
              <p className="thin-text-13 underline mr-2">Brainstorm</p>
              <p className="thin-text-13 underline mr-2">Outline</p>
              <p className="thin-text-13 underline mr-2">PLotline</p>
            </div>
          </div>
        </div>


      }

    </div>
  );
};

export default ListCard;

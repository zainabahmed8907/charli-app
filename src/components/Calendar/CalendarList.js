import React from 'react';
import { Card, Badge, List } from 'antd';
import { useSelector } from 'react-redux';

const ListCalendar = () => {
  const { calendar_list, loading } = useSelector((state) => state.calendar);

  return (
    <>
      <div className="list-card">
        {calendar_list?.length > 0 &&
          calendar_list?.map((e) => (
            <div>
              <div className="event-title">{e.event_date}</div>
              <div className="list-desc">
                <div className="event-time">{e.start_time}</div>
                <div className="event-badges">
                  <Badge color={e.color} text={e.title} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ListCalendar;

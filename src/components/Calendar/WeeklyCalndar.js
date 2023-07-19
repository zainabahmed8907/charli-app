import { Calendar, Select } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const WeekCalendar = () => {
  const { calendar_list } = useSelector((state) => state.calendar);

  const Time = (time) => {
    var start = new Date(),
      s = time,
      parts = s.match(/(\d+)\:(\d+) (\w+)/),
      hours = /am/i.test(parts[3])
        ? parseInt(parts[1], 10)
        : parseInt(parts[1], 10) + 24,
      minutes = parseInt(parts[2], 10);
    start.setHours(hours, minutes, 0, 0);

    return start;
  };

  const events = calendar_list.map((c) => ({
    title: c?.title,

    startTime: Time(c?.start_time),
    endTime: Time(c?.end_time),
    eventDate: moment(c?.event_date),
    backgroundColor: c?.color
  }));

  function dateCellRender(date) {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    const eventsForDate = events?.filter((event) => {
      const eventStartDate = moment(event?.eventDate).format('YYYY-MM-DD');
      return eventStartDate === formattedDate;
    });
    return (
      <div>
        {eventsForDate?.map((event) => (
          <div key={event.title}
            style={{
              backgroundColor: event?.backgroundColor,
              color: "white", width: "100%", borderRadius: "5px", height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            {event?.title}
          </div>
        ))}
      </div>
    );
  }

  function onPanelChange(date, mode) {
    console.log(date, mode);
  }

  function renderHeader({ value, type, onChange }) {
    const start = moment(value).startOf('week');
    const end = moment(value).endOf('week');
    const weekNumber = moment(value).week();

    return (
      <div style={{ display: 'flex' }}>
        <div className='weekName ml-2 mr-2 '>{`Week ${weekNumber} (${start.format('MMM DD')} - ${end.format('MMM DD')})`}</div>
        <div>
          <button
            className='weeklyCalendarbtn mr-3'
            onClick={() => onChange(moment(value).subtract(1, 'week'))}>{'<'}</button>
          <button
            className='weeklyCalendarbtn'

            onClick={() => onChange(moment(value).add(1, 'week'))}>{'>'}</button>
        </div>
      </div>
    );
  }


  return (
    <>
      <div className="weeklycalendar">
        {/* <WeeklyCalendar
          events={events?.length > 0 && events}
        // onEventClick={(event) => console.log(event)}
        // onSelectDate={(date) => console.log(date)}
        /> */}
        <Calendar
          mode="week"
          onPanelChange={onPanelChange}
          dateCellRender={dateCellRender}
          headerRender={renderHeader}

        />
      </div>
    </>
  );
};

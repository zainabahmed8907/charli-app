import moment from "moment";
import React from "react";

const CalendarEvents = ({ id, title, start, end }) => {
  const dateFormat = "YYYY-MM-DD";

  return (
    <div id={id}>
      <p>{title}</p>
      <ul style={{ display: "none" }}>
        <li>{moment(start).format(dateFormat)}</li>
        <li>{moment(end).format(dateFormat)}</li>
      </ul>
    </div>
  );
};

export default CalendarEvents;

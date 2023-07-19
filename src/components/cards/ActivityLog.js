import React from "react";

import "./index.scss";

const ActivityLog = ({
  date,
  finished,
  inProgress,
  books,
  series,
  ...rest
}) => {
  return (
    <>
      <div className="activity-log-container">
        <div className="display-flex">
          <div className="date-container mr-3 ml-3">
            <p className="text-14 font-w-600">{date}</p>
          </div>
          <div className="mr-2">
            <p className="text-13 font-w-600 blue-color mb-1">Finished:</p>
            <p className="text-13 font-w-500 black-color mb-1">In-Progress:</p>
            <p className="text-13 font-w-500 black-color mb-1">WIP Book:</p>
            <p className="text-13 font-w-500 black-color">WIP Series:</p>
          </div>
          <div>
            <p
              className={`text-13 font-w-600 blue-color ${rest?.style ?? null} mb-1`}
            >
              {finished}
            </p>
            <p className="text-13 font-w-500 black-color mb-1">{inProgress}</p>
            <p className="text-13 font-w-500 black-color mb-1">{books}</p>
            <p className="text-13 font-w-500 black-color">{series}</p>
          </div>
        </div>
      </div>
      <div className="divider" />
    </>
  );
};

export default ActivityLog;

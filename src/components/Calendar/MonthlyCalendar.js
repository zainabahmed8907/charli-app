import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed
import { Modal, Button, Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCalendarEvent,
  postCalenderList,
  updateCalendarEvent
} from '../../redux/Slice/CalendarSlice';

import moment from 'moment';
import CalendarEventDrawer from './CalendarEventDrawer';
const Time = (time) => {
  var start = new Date(),
    s = time,
    parts = s.match(/(\d+)\:(\d+) (\w+)/),
    hours = /am/i.test(parts[3])
      ? parseInt(parts[1], 10)
      : parseInt(parts[1], 10) + 24,
    minutes = parseInt(parts[2], 10);
  start.setHours(hours, minutes, 0);

  return start;
};
const MonthlyCalendar = () => {
  const dispatch = useDispatch();

  const { calendar_list, loading } = useSelector((state) => state.calendar);
  const [eventDrawer, setEventDrawer] = useState(false);

  const [actionModal, setActionModal] = useState(false);
  const [eventID, setEventId] = useState();

  const dateFormat = 'YYYY-MM-DD';

  const updatedEvent = calendar_list?.find(c => c?.id == eventID);

  //action modal Methods

  const showActionModal = () => {
    setActionModal(true);
  };
  const handleActionOk = () => {
    setActionModal(false);
  };
  const handleActionCancel = () => {
    setActionModal(false);
  };

  //Drawer methods

  const s = moment(updatedEvent?.end_time, ['hh:mm A']).format('HH:mm:ss');
  console.log(s);


  const showDrawer = () => {
    setEventDrawer(true);
    setActionModal(false);

    form.setFieldsValue({
      title: updatedEvent?.title,
      location: updatedEvent?.location,
      description: updatedEvent?.description,
      color_id: updatedEvent?.color_id,
      start_time: moment(updatedEvent?.start_time, "HH:mm:ss"),
      end_time: moment(updatedEvent?.end_time, "HH:mm:ss"),

      event_date: moment(eventDate, 'DD-MM-YYYY')
    });
  };
  const closeEventDrawer = () => {
    setEventDrawer(false);
  };
  const handleSubmit = (e) => {
    let data = { ...e };
    const payload = { id: eventID, data: data };

    dispatch(updateCalendarEvent(payload));


    closeEventDrawer();
  };
  //delete Event

  const deleteEvent = () => {
    dispatch(deleteCalendarEvent(eventID));

    setTimeout(() => {
      dispatch(postCalenderList());
    }, 1000);
    setActionModal(false);

  };

  //extract events from Calendar API
  const events = calendar_list.map((c) => ({
    title: c?.title,
    start: moment(c?.start).format(dateFormat),
    end: moment(c?.end).format(dateFormat),
    color: c?.color,

    description: c?.description,
    id: c.id,
    start_time: moment(Time(c?.start_time).getTime(), 'hh:mm').format('HH:mm:ss'),
    end_time: moment(Time(c?.end_time).getTime(), 'hh:mm').format('HH:mm:ss'),
    col: c?.color_id,
    event_date: moment(c?.event_date).format('DD-MM-YYYY'),
    location: c?.location
  }));
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [color_id, setColorId] = useState('');
  //form hook
  const [form] = Form.useForm();


  return (
    <>
      <FullCalendar
      
        selectable={true}
        editable={true}
        height={763}
        defaultView="dayGridMonth"
        themeSystem="bootstrap"
        plugins={[dayGridPlugin, interactionPlugin]}
        events={events?.length > 0 && events}
        displayEventEnd="true"
        navLinks={true}
        eventLimit={true}
        eventColor={'pink'}
        eventClick={function (calEvent) {
          showActionModal();
          setEventId(parseInt(calEvent.event._def.publicId));

          setTitle(calEvent.event._def.title);
          setDesc(calEvent.event._def.extendedProps.description);
          setLocation(calEvent.event._def.extendedProps.location);
          setStartTime(calEvent.event._def.extendedProps.start_time);
          setEndTime(moment(updatedEvent?.end_time, ['hh:mm A']).format("HH:mm:ss"));
          setEventDate(calEvent.event._def.extendedProps.event_date);
          setColorId(calEvent.event.extendedProps.col);
        }}
      />

      <Modal
        title="Edit/Delete"
        open={actionModal}
        onOk={handleActionOk}
        onCancel={handleActionCancel}
        className="chapterModal"
        mask={false}
        width={350}
        style={{
          marginLeft: '45%',
          marginRight: 'auto',
          position: 'relative',
          marginTop: '12%',
          padding: '1.2rem',
          height: '20rem'
        }}
      >
        <div className="buttons-container mt-3 d-flex space-between p-3">
          <Button type="primary" onClick={showDrawer} className="mr-3">
            Edit
          </Button>
          <Button type="primary" onClick={deleteEvent}>
            Delete
          </Button>
        </div>
      </Modal>

      <CalendarEventDrawer
        open={eventDrawer}
        close={closeEventDrawer}
        isUpdate={true}
        id={eventID}
        onSubmit={handleSubmit}
        form={form}
        startTime={moment(updatedEvent?.start_time, ['hh:mm A']).format("HH:mm:ss")}
        endTime={moment(updatedEvent?.end_time, ['hh:mm A']).format("HH:mm:ss")}
        eventDate={eventDate}
      />
    </>
  );
};
export default MonthlyCalendar;

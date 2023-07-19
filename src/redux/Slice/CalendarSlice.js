import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import { apiServices } from "../../services/apiServices/Api";

//post calendar list
export const postCalenderList = createAsyncThunk(
  "calendar/postCalenderList",
  (date_from, date_to) => {
    const dateFrom = moment(new Date(date_from)).format("DD-MM-YYYY");
    const dateTo = moment(new Date(date_to)).format("DD-MM-YYYY");

    const data = {
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
    const calendarData = apiServices
      .post(`/calendars-list`, data)
      .then((response) => {
        return response;
      });

    console.log("posted calendar data", calendarData);

    return calendarData;
  }
);

//post calendar event
export const postCalendarEvent = createAsyncThunk(
  "calendar/postCalendarEvent",
  (cal) => {
    console.log("cal", cal);
    const calendarData = apiServices
      .post(`/calendars`, cal.data)
      .then((response) => response)
      .catch((err) => console.log(err));
    return calendarData;
  }
);

//get calendar event
export const getCalendarEvent = createAsyncThunk(
  "calendar/getCalendarEvent",
  (id) => {
    const calendarData = apiServices
      .get(`/calendars/${id}`)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => err);
    return calendarData;
  }
);
//delete a calendar event

export const deleteCalendarEvent = createAsyncThunk(
  "calendar/deleteCalendarEvent",
  (id) => {
    const calData = apiServices
      .delete(`/calendars/${id}`)
      .then((response) => response.data)
      .catch((err) => console.log(err));

    return calData;
  }
);

//update calendar event
export const updateCalendarEvent = createAsyncThunk(
  "calendar/updateCalendarEvent",
  ({ id, data }) => {
    const calData = apiServices
      .update(`/calendars/${id}`, data)
      .then((response) => response)
      .catch((err) => err);
      console.log("calendar events", calData);
    
    return calData;
  }
);
const initialState = {
  calendar_list: [],
  loading: false,
  error: false,
  event: [],
};

const CalendarSlice = createSlice({
  name: "calendar",
  initialState,
  extraReducers: {
    //post calendar list
    [postCalenderList.pending]: (state) => {
      state.loading = true;
    },
    [postCalenderList.fulfilled]: (state, action) => {
      state.loading = false;
      state.calendar_list = [...action.payload];

    },

    [postCalenderList.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    //post calendar event

    [postCalendarEvent.pending]: (state) => {
      state.loading = true;
    },
    [postCalendarEvent.fulfilled]: (state, action) => {
      state.loading = false;
      state.event = [action.payload];
    },
    [postCalendarEvent.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

    //get calendar event
    [getCalendarEvent.pending]: (state) => {
      state.loading = true;
    },
    [getCalendarEvent.fulfilled]: (state, action) => {
      state.loading = false;
      state.event = [action.payload];
    },
    [getCalendarEvent.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

    //delete calendar event
    [deleteCalendarEvent.pending]: (state) => {
      state.loading = true;
    },
    [deleteCalendarEvent.fulfilled]: (state, action) => {
      state.loading = false;

      state.event = action.payload;
    },
    [deleteCalendarEvent.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

    //update calendar event
    [updateCalendarEvent.pending]: (state) => {
      state.loading = true;
    },
    [updateCalendarEvent.fulfilled]: (state, action) => {
      state.loading = false;
      state.event = [action.payload];
      console.log("updated calendar Event", action.payload);
    },
    [updateCalendarEvent.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

  },
});

const CalendarReducer = CalendarSlice.reducer;
export const { setEdit } = CalendarSlice.actions;

export default CalendarReducer;

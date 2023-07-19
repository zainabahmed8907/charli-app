import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from "../../services/apiServices/Api";
import { message } from "antd";

//post
export const postTimeLine = createAsyncThunk(
  "timeline/postTimeLine",
  (timeline) => {
    const timelineData = apiServices
      .post(`/timelines`, timeline.data)
      .then((response) => {
        return response;
      })
      .catch((err) => console.log("err in posttimeline", err));
    console.log(timelineData);
    return timelineData;
  }
);

//get timelinelist data
export const getTimelineList = createAsyncThunk(
  "timeline/getTimelineList",
  (id) => {
    const timeline = apiServices
      .get(`/timelines-list/${id}`)
      .then((response) => response)
      .catch((e) => e);

    console.log(timeline);

    return timeline;
  }
);

//get single timeline
export const getTimeline = createAsyncThunk("timeline/getTimeline", (id) => {
  const timeline = apiServices
    .get(`/timelines/${id}`)
    .then((response) => response)
    .catch((e) => e);

  return timeline;
});

//delete timeline
export const deleteTimeline = createAsyncThunk(
  "timeline/deleteTimeline",
  async ({ id }) => {
    await apiServices.delete(`/timelines/${id}`).then((response) => response);

    return { id };
  }
);

//update timeline
export const updateTimeline = createAsyncThunk(
  "timeline/updateTimeline",
  async ({ id, data }) => {
    const timeline = apiServices
      .update(`/timelines/${id}`, data)
      .then((response) => {
        return response;
      });

    return timeline;
  }
);

//post event type
export const postEventType = createAsyncThunk(
  "timeline/postEventType",
  (timelin) => {
    const timeline = apiServices
      .post(`/timeline-event-types`, timelin.data)
      .then((response) => response)
      .catch((err) => console.log(err));
    return timeline;
  }
);

//get event type list

export const getEventTypeList = createAsyncThunk(
  "timeline/getEventTypeList",
  (id) => {
    const timeline = apiServices
      .get(`timeline-event-types-list/${id}`)
      .then((response) => response)
      .catch((err) => console.log(err));
    return timeline;
  }
);

//delete event
export const deleteEvent = createAsyncThunk(
  "timeline/deleteEventType",
  (id) => {
    const timeline = apiServices
      .delete(`timeline-event-types/${id}`)
      .then((response) => response)
      .catch((err) => console.log(err));
    return timeline;
  }
);

//update event
export const updateEvent = createAsyncThunk(
  "timeline/updateEventType",
  ({ id, data }) => {
    const timeline = apiServices
      .update(`timeline-event-types/${id}`, data)
      .then((response) => response)
      .catch((err) => console.log(err));
    return timeline;
  }
);

// //get books of series
// export const getBookofSeries = createAsyncThunk(
//   "series/getBookofSeries",
//   () => {
//     const seriesData = apiServices
//       .get(`/series-books`)
//       .then((response) => response)
//       .then(({ data }) => {
//         let result = data?.map((obj) => ({
//           ...obj,
//           value: obj.id,
//           label: obj.series_name,
//         }));
//         return result;
//       });
//     console.log("series of book", seriesData);
//     return seriesData;
//   }
// );

const initialState = {
  timelineData: [],

  loading: false,
  error: false,
  edit: false,

  events: [],
  timeline: [],
};

const TimelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setEdit: (state, action) => {
      state.edit = action.payload.edit;

      state.body = action.payload.body;
    },
  },
  extraReducers: {
    [postTimeLine.pending]: (state) => {
      state.loading = true;
    },
    [postTimeLine.fulfilled]: (state, action) => {
      state.loading = false;
      state.timelineData.push(action.payload);
      message.success("Timeline created successfully");
    },
    [postTimeLine.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
      message.success("Timeline not created");

    },
    [getTimelineList.pending]: (state) => {
      state.loading = true;
    },
    [getTimelineList.fulfilled]: (state, action) => {
      state.loading = false;
      state.timelineData = [...action.payload.data];
    },
    [getTimelineList.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    [getTimeline.pending]: (state) => {
      state.loading = true;
    },
    [getTimeline.fulfilled]: (state, action) => {
      state.loading = false;
      state.timeline = [action.payload];
    },
    [getTimeline.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    [updateTimeline.pending]: (state) => {
      state.loading = true;
    },
    [updateTimeline.fulfilled]: (state, action) => {
      state.loading = false;
      state.timelineData = [action.payload];
      message.success("Timeline updated successfully");

    },
    [updateTimeline.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.error("Timeline not updated");

    },
    [deleteTimeline.pending]: (state) => {
      state.loading = true;
    },
    [deleteTimeline.fulfilled]: (state, action) => {
      state.loading = false;

      state.timelineData = action.payload;
      message.success("Timeline deleted successfully");

    },
    [deleteTimeline.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.error("Timeline not deleted");

    },
    [postEventType.pending]: (state) => {
      state.loading = true;
    },
    [postEventType.fulfilled]: (state, action) => {
      state.loading = false;
      state.events = [action.payload];
    },
    [postEventType.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
    },
    [getEventTypeList.pending]: (state) => {
      state.loading = true;
    },
    [getEventTypeList.fulfilled]: (state, action) => {
      state.loading = false;
      state.events = [action.payload];
    },
    [getEventTypeList.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
    },

    [deleteEvent.pending]: (state) => {
      state.loading = true;
    },
    [deleteEvent.fulfilled]: (state, action) => {
      state.loading = false;
      state.event = action.payload;
    },
    [deleteEvent.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    [updateEvent.pending]: (state) => {
      state.loading = true;
    },
    [updateEvent.fulfilled]: (state, action) => {
      state.loading = false;
      state.events = [action.payload];
    },
    [updateEvent.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

const TimeLinereducer = TimelineSlice.reducer;
export const { setEdit } = TimelineSlice.actions;
export default TimeLinereducer;

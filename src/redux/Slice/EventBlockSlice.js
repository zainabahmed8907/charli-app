import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from "../../services/apiServices/Api";
import { message } from "antd";

//post event block
export const postEventBlock = createAsyncThunk(
  "eventBlock/postEventBlock",
  (eventBlock) => {
    const eventBlockData = apiServices
      .post(`/timeline-event-blocks`, eventBlock.data)
      .then((response) => response)
      .then((data) => data)
      .catch((err) => console.log("err in posting block", err));
    return eventBlockData;
  }
);

//delete EevntBlock
export const deleteEventBlock = createAsyncThunk(
  "eventBlock/deleteEventBlock",
  (id) => {
    const eventBlockData = apiServices
      .delete(`/timeline-event-blocks/${id}`)
      .then((response) => response)

      .catch((err) => console.log("err in deleteing block", err));
    return eventBlockData;
  }
);



//get event Block
export const getEventBlock = createAsyncThunk(
  "eventBlock/getEventBlock",
  (id) => {
    const eventBlockData = apiServices
      .get(`/timelines/${id}`)
      .then((response) => response)
      .then((data) => data)
      .catch((err) => err);
    return eventBlockData;
  }
);

//update Event Block
export const updateEventBlock = createAsyncThunk(
  "eventBlock/updateEventBlock",
  ({ id, data }) => {
    const eventBlockData = apiServices
      .update(`/timeline-event-blocks/${id}`, data)
      .then((response) => {
        console.log('update response', response);
        return response;
      })
      .then((data) => data)
      .catch((err) => err);
    return eventBlockData;
  }
);

//update Event Block
export const updateEvBlock = createAsyncThunk(
  "eventBlock/updateEvBlock",
  ({ id, data }) => {
    const eventBlockData = apiServices
      .update(`/update-timeline-event-block/${id}`, data)
      .then((response) => {
        return response;
      })
      .then((data) => data)
      .catch((err) => err);
    return eventBlockData;
  }
);

const initialState = {
  eventBlock: [],

  loading: false,
  error: false,
};
const EventBlockSlice = createSlice({
  name: "eventBlock",
  initialState,
  extraReducers: {
    [postEventBlock.pending]: (state) => {
      state.loading = true;
    },
    [postEventBlock.fulfilled]: (state, action) => {
      state.loading = false;
      state.eventBlock = [action.payload];
      message.success("Event Block created successfully");

    },
    [postEventBlock.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
      message.error("Event Block not created");

    },


    [updateEventBlock.pending]: (state) => {
      state.loading = true;
    },
    [updateEventBlock.fulfilled]: (state, action) => {
      state.loading = false;
      state.eventBlock = [action.payload];
      message.success("Event Block udpated successfully");

    },
    [updateEventBlock.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
      message.error("Event Block not updated");

    },
    [getEventBlock.pending]: (state) => {
      state.loading = true;
    },
    [getEventBlock.fulfilled]: (state, action) => {
      state.loading = false;
      state.eventBlock = [action.payload];
    },
    [getEventBlock.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
    },

    //delete Evenet Block
    [deleteEventBlock.pending]: (state) => {
      state.loading = true;
    },
    [deleteEventBlock.fulfilled]: (state, action) => {
      state.loading = false;
      state.eventBlock = action.payload;
      message.success("Event Block deleted successfully");

    },
    [deleteEventBlock.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
      message.success("Event Block not deleted");

    },

    //update block

    [updateEvBlock.pending]: (state) => {
      state.loading = true;
    },
    [updateEvBlock.fulfilled]: (state, action) => {
      state.loading = false;
      state.eventBlock = [action.payload];
    },
    [updateEvBlock.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
    },


  },
});
const EventBlockReducer = EventBlockSlice.reducer;
export default EventBlockReducer;

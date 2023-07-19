import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from "../../services/apiServices/Api";
import { message } from "antd";

//post branstorm
export const postBrainStorm = createAsyncThunk(
  "brainstorm/postBrainStorm",
  (brainstorm) => {
    const brainstormData = apiServices
      .post(`/brainstorms`, brainstorm.data)
      .then((response) => response)

      .catch((err) => console.log(err));
    return brainstormData;
  }
);
//get brainstorm data
export const getBrainStorm = createAsyncThunk(
  "brainstorm/getBrainStorm",
  (id) => {
    const bs = apiServices
      .get(`/brainstorms-list/${id}`)
      .then((response) => response)
      .catch((err) => err);
    return bs;
  }
);

//get single brainstorm
export const getSingleBrainsStorm = createAsyncThunk(
  "brainstorm/getSingleBrainsStorm",
  (id) => {
    const bs = apiServices
      .get(`/brainstorms/${id}`)
      .then((response) => response)
      .catch((err) => err);
    return bs;
  }
);

//delete brainstorm
export const deleteBrainStorm = createAsyncThunk(
  "brainstorm/deleteBrainStorm",
  async ({ id }) => {
    await apiServices.delete(`/brainstorms/${id}`).then((response) => response);

    return { id };
  }
);

//update brainstorm
export const updateBrainStorm = createAsyncThunk(
  "brainstorm/updateBrainStorm",
  ({ id, data }) => {
    const brainstorm = apiServices
      .post(`/brainstorms/${id}`, data)
      .then((response) => response);
    return brainstorm;
  }
);

const initialState = {
  bstorm: [],

  loading: false,
  error: false,
  bs: []
};

const BrainstormSlice = createSlice({
  name: "brainstorm",
  initialState,

  extraReducers: {
    [postBrainStorm.pending]: (state) => {
      state.loading = true;
    },
    [postBrainStorm.fulfilled]: (state, action) => {
      state.loading = false;
      state.bstorm = [action.payload];
      message.success("brainstorm created successfully");
    },
    [postBrainStorm.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
      message.error("brainstorm not created");

    },
    [getBrainStorm.pending]: (state) => {
      state.loading = true;
    },
    [getBrainStorm.fulfilled]: (state, action) => {
      state.loading = false;
      state.bstorm = [...action.payload?.data];
    },
    [getBrainStorm.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

    [deleteBrainStorm.pending]: (state) => {
      state.loading = true;
    },
    [deleteBrainStorm.fulfilled]: (state, action) => {
      state.loading = false;
      state.bstorm = action.payload;
      message.success("brainstorm deleted successfully");

    },
    [deleteBrainStorm.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.error("brainstorm not deleted");

    },

    [updateBrainStorm.pending]: (state) => {
      state.loading = true;
    },
    [updateBrainStorm.fulfilled]: (state, action) => {
      state.loading = false;
      state.bstorm = [action.payload];
      message.success("brainstorm updated successfully");

    },
    [updateBrainStorm.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.error("brainstorm not updated");

    },


    [getSingleBrainsStorm.pending]: (state) => {
      state.loading = true;
    },
    [getSingleBrainsStorm.fulfilled]: (state, action) => {
      state.loading = false;
      state.bs = [action.payload];
    },
    [getSingleBrainsStorm.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    // [deleteSeriesData.pending]: (state) => {
    //   state.loading = true;
    // },
    // [deleteSeriesData.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.seriesData = action.payload;
    // },
    // [deleteSeriesData.rejected]: (state, action) => {
    //   state.loading = true;
    //   state.error = action.payload;
    // },
    // [updateSeries.pending]: (state) => {
    //   state.loading = true;
    // },
    // [updateSeries.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.seriesData = [action.payload];
    //   console.log(action.payload);
    // },
    // [updateSeries.rejected]: (state, action) => {
    //   state.loading = true;
    //   state.error = action.payload;
    // },
    // [getBookofSeries.pending]: (state) => {
    //   state.loading = true;
    // },
    // [getBookofSeries.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.books = [action.payload];
    // },
    // [getBookofSeries.rejected]: (state, action) => {
    //   state.loading = true;
    //   state.error = action.payload;
    // },
  },
});
const BrainStormReducer = BrainstormSlice.reducer;
export const { setEdit } = BrainstormSlice.actions;
export default BrainStormReducer;

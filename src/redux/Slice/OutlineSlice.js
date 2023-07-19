import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { apiServices } from "../../services/apiServices/Api";

//post
export const postOutlineData = createAsyncThunk(
  "outline/postOutlineData",
  (outline) => {
    const outlineData = apiServices
      .post(`/outlines`, outline.data)
      .then((response) => {
        return response;
      })

      .catch((err) => console.log(err));
    return outlineData;
  }
);

//get outline data
export const getOutlineList = createAsyncThunk(
  "outline/getOutlineList",
  (id) => {
    const outlineData = apiServices
      .get(`/outlines-list/${id}`)
      .then((response) => response)
      .catch((err) => err);
    return outlineData;
  }
);
export const getOutline = createAsyncThunk("outline/getOutlineLine", (id) => {
  const outlineData = apiServices
    .get(`/outlines/${id}`)
    .then((response) => response)
    .then((data) => data);
  return outlineData;
});

export const updateOutline = createAsyncThunk(
  "outline/updateOutline",
  ({ id, data }) => {
    const outline = apiServices
      .update(`/outlines/${id}`, data)
      .then((response) => {
        return response;
      });

    return outline;
  }
);
export const deleteOutline = createAsyncThunk(
  "outline/deleteOutline",
  async ({ id }) => {
    await apiServices.delete(`/outlines/${id}`).then((response) => response);

    return { id };
  }
);
const initialState = {
  outlineData: [],

  loading: false,
  error: false,
  outline: [],
};

const OutlineSlice = createSlice({
  name: "outline",
  initialState,
  extraReducers: {
    [getOutlineList.pending]: (state) => {
      state.loading = true;
    },
    [getOutlineList.fulfilled]: (state, action) => {
      state.loading = false;
      state.outlineData = [...action.payload?.data];
    },
    [getOutlineList.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
    },
    [getOutline.pending]: (state) => {
      state.loading = true;
    },
    [getOutline.fulfilled]: (state, action) => {
      state.loading = false;
      state.outline = [action.payload];
    },
    [getOutline.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
    },
    [postOutlineData.pending]: (state) => {
      state.loading = true;
    },
    [postOutlineData.fulfilled]: (state, action) => {
      state.loading = false;
      state.outlineData = [action.payload];
      message.success("Outline created successfully");
    },
    [postOutlineData.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
      message.success("Outline not created");
    },
    [updateOutline.pending]: (state) => {
      state.loading = true;
    },
    [updateOutline.fulfilled]: (state, action) => {
      state.loading = false;
      state.outlineData = [action.payload];
      message.success("outline updated successfully");
    },
    [updateOutline.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.error('Outline not updated');
    },
    [deleteOutline.pending]: (state) => {
      state.loading = true;
    },
    [deleteOutline.fulfilled]: (state, action) => {
      state.loading = false;
      state.outlineData = action.payload;
      message.success("Outline deleted successfully");
    },
    [deleteOutline.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.error("Outline not deleted");
    },
  },
});

const OutlineReducer = OutlineSlice.reducer;

export default OutlineReducer;

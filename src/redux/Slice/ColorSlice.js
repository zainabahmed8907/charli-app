import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from "../../services/apiServices/Api";

export const getColorData = createAsyncThunk("colors/getColorData", async() => {
  const colorData = await apiServices.get(`/colors`).then((response) => {
    let data = response.data.map((obj) => ({
      ...obj,
      value: obj.id,
      label: obj.color,
    }));
    return data;
  });

  return colorData;
});
const initialState = {
  colors: [],
};

const ColorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: {
    [getColorData.pending]: (state) => {
      state.loading = true;
    },
    [getColorData.fulfilled]: (state, action) => {
      state.loading = false;
      state.colors = action.payload;
    },
    [getColorData.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

const ColorReducer = ColorSlice.reducer;

export default ColorReducer;

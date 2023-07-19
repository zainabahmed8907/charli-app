import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from "../../services/apiServices/Api";

//post
export const postPLotlineData = createAsyncThunk(
  "plotline/postPLotlineData",
  (plotline) => {
    const plotlineData = apiServices
      .post(`/plot-planners`, plotline.data)
      .then((response) => response)

      .catch((err) => console.log(err));
    return plotlineData;
  }
);

//get plotlines data
export const getPlotlineList = createAsyncThunk(
  "plotline/getPlotlineList",
  (id) => {
    const plotlineData = apiServices
      .get(`/plot-planners-list/${id}`)
      .then((response) => response)
      .catch((err) => err);
    return plotlineData;
  }
);
export const getPlotline = createAsyncThunk(
  "plotline/getPlotlineLine",
  (id) => {
    const plotlineData = apiServices
      .get(`/plot-planners/${id}`)
      .then((response) => response)
      .then((data) => data);
    return plotlineData;
  }
);

export const updatePlotline = createAsyncThunk(
  "plotline/updatePlotline",
  ({ id, data }) => {
    const plotline = apiServices
      .update(`/plot-planners/${id}`, data)
      .then((response) => {
        return response;
      });

    return plotline;
  }
);
export const deletePlotline = createAsyncThunk(
  "plotline/deletePlotline",
  async ({ id }) => {
    await apiServices
      .delete(`/plot-planners/${id}`)
      .then((response) => response);

    return { id };
  }
);


export const getplotline = createAsyncThunk(
  "plotline/getplotline",
  async ({ id }) => {
    const plotline = apiServices
      .get(`/plot-planners/${id}`)
      .then((response) => {
        return response;
      })
      .catch(er => console.log(er));

    return plotline;
  }
);


//post single plotline

export const postPlotPlanner = createAsyncThunk(
  "plotline/postPlotPlanner",
  (plotline) => {
    const plotline_ = apiServices
      .post(`/plot-lines`, plotline.data)
      .then((response) => response)
      .catch((err) => console.log(err));
    return plotline_;
  }
);

//get single plotline

export const getPlotPlanner = createAsyncThunk(
  "plotline/getPlotPlanner",
  (id) => {
    const plotline = apiServices
      .get(`plot-planners/${id}`)
      .then((response) => response)
      .catch((err) => console.log(err));
    return plotline;
  }
);
const initialState = {
  plotlines: [],

  loading: false,
  error: false,
  plotline: [],
  plotplanner: []
};

const plotlineSlice = createSlice({
  name: "plotline",
  initialState,
  reducers: {},
  extraReducers: {
    [getPlotlineList.pending]: (state) => {
      state.loading = true;
    },
    [getPlotlineList.fulfilled]: (state, action) => {
      state.loading = false;
      state.plotlines = [...action.payload.data];
    },
    [getPlotlineList.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
    },
    [getPlotline.pending]: (state) => {
      state.loading = true;
    },
    [getPlotline.fulfilled]: (state, action) => {
      state.loading = false;
      state.plotline = [action.payload];
    },
    [getPlotline.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
    },
    [postPLotlineData.pending]: (state) => {
      state.loading = true;
    },
    [postPLotlineData.fulfilled]: (state, action) => {
      state.loading = false;
      state.plotlines = [action.payload];
    },
    [postPLotlineData.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
    },
    [updatePlotline.pending]: (state) => {
      state.loading = true;
    },
    [updatePlotline.fulfilled]: (state, action) => {
      state.loading = false;
      state.plotlines = [action.payload];
    },
    [updatePlotline.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    [deletePlotline.pending]: (state) => {
      state.loading = true;
    },
    [deletePlotline.fulfilled]: (state, action) => {
      state.loading = false;
      state.plotlines = action.payload;
    },
    [deletePlotline.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

    //add single plotline
    [postPlotPlanner.pending]: (state) => {
      state.loading = true;
    },
    [postPlotPlanner.fulfilled]: (state, action) => {
      state.loading = false;
      state.plotline = [action.payload];
    },
    [postPlotPlanner.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
    },

    //get Single plot planner
    [getPlotPlanner.pending]: (state) => {
      state.loading = true;
    },
    [getPlotPlanner.fulfilled]: (state, action) => {
      state.loading = false;
      state.plotplanner = [action.payload];
    },
    [getPlotPlanner.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
    },

  },
});

const plotlineReducer = plotlineSlice.reducer;

export default plotlineReducer;

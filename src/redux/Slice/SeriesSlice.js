import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { apiServices } from "../../services/apiServices/Api";

//post
export const postSeriesData = createAsyncThunk(
  "series/postSeriesData",
  (series) => {
    const seriesData = apiServices
      .post(`/seriess`, series.data)
      .then((response) => {
        console.log('series ', response);
        return response;
      })
      .then(({ data }) => {
        let result = data?.map((obj) => ({
          ...obj,
          value: obj.id,
          label: obj.series_name,
        }));
        return result;
      }).catch(e=>e);
    return seriesData;
  }
);

//get series data
export const getSeriesData = createAsyncThunk("series/getSeriesData", () => {
  const seriesData = apiServices
    .get(`/seriess`)
    .then((response) => response)
    .then(({ data }) => {
      let result = data?.map((obj) => ({
        ...obj,
        value: obj.id,
        label: obj.series_name,
      }));
      return result;
    });
  return seriesData;
});

//delete Series
export const deleteSeriesData = createAsyncThunk(
  "series/deleteSeriesData",
  async (id) => {
    const seriesData = await apiServices
      .delete(`/seriess/${id}`)
      .then((response) => {
        if (response.success) {
          // message.success(response.message);
        } else {
          message.error(response.message);
        }
        return response;
      });

    console.log("deleted", seriesData);
    return seriesData;
  }
);

export const updateSeries = createAsyncThunk(
  "series/updateSeries",
  ({ id, data }) => {
    const seriesData = apiServices
      .update(`/seriess/${id}`, data)
      .then((response) => {
        console.log("update response", response);
        return response;
      });

    return seriesData;
  }
);

//get books of series
export const getBookofSeries = createAsyncThunk(
  "series/getBookofSeries",
  (id) => {
    const seriesData = apiServices
      .get(`/books-list/${id}`)
      .then((response) => response)
      .then(({ data }) => {
        let result = data?.map((obj) => ({
          ...obj,
          value: obj.id,
          label: obj.series_name,
        }));
        return result;
      });
    return seriesData;
  }
);

const initialState = {
  seriesData: [],

  loading: false,
  error: false,
  edit: false,
  body: "",
  books: [],
  booksOfSeries: []
};

const SeriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {
    setEdit: (state, action) => {
      state.edit = action.payload.edit;

      state.body = action.payload.body;
    },
  },
  extraReducers: {
    [postSeriesData.pending]: (state) => {
      state.loading = true;
    },
    [postSeriesData.fulfilled]: (state, action) => {
      state.loading = false;
      state.seriesData = [action.payload];
      console.log("series success")
      message.success("series created successfully");
    },
    [postSeriesData.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
      console.log("series failure")
      message.error("series not created");

    },
    [getSeriesData.pending]: (state) => {
      state.loading = true;
    },
    [getSeriesData.fulfilled]: (state, action) => {
      state.loading = false;
      state.seriesData = [action.payload];
    },
    [getSeriesData.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

    [deleteSeriesData.pending]: (state) => {
      state.loading = true;
    },
    [deleteSeriesData.fulfilled]: (state, action) => {
      state.loading = false;
      state.seriesData = action.payload;
      message.success("series deleted succesfully");
    },
    [deleteSeriesData.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.error("series not deleted");
    },
    
    [updateSeries.pending]: (state) => {
      state.loading = true;
    },
    [updateSeries.fulfilled]: (state, action) => {
      state.loading = false;
      state.seriesData = [action.payload];
      message.success("series updated successfully");
    },
    [updateSeries.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.error("series not updated");
    },
    [getBookofSeries.pending]: (state) => {
      state.loading = true;
    },
    [getBookofSeries.fulfilled]: (state, action) => {
      state.loading = false;
      state.booksOfSeries = [action.payload];
    },
    [getBookofSeries.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },


  },
});

const SeriesReducer = SeriesSlice.reducer;
export const { setEdit } = SeriesSlice.actions;
export default SeriesReducer;

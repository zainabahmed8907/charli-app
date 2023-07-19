import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiServices } from "../../services/apiServices/Api";

export const getGalleryData = createAsyncThunk("gallery/getGalleryData", () => {
  const galleryData = apiServices
    .get(`/user-galleries`)
    .then((response) => response.data);
  return galleryData;
});

export const postGalleryData = createAsyncThunk(
  "gallery/postGalleryData",
  (img) => {
    console.log("Sd", img);
    const galleryData = apiServices
      .post(`/user-galleries`, img)
      .then((response) => response)

      .catch((err) => console.log(err));
    console.log(galleryData);
    return galleryData;
  }
);

export const deleteGalleryimage = createAsyncThunk(
  "gallery/deleteGalleryimage",
  (id) => {
    const data = apiServices.delete(`/user-galleries/${id}`).then((response) => {
      console.log("gallery response", response);
      return response;
    });
    return data;
  }
);

const initialState = {
  gallery: [],
};

const GallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {},
  extraReducers: {
    [getGalleryData.pending]: (state) => {
      state.loading = true;
    },
    [getGalleryData.fulfilled]: (state, action) => {
      state.loading = false;
      state.gallery = action.payload;
    },
    [getGalleryData.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    [deleteGalleryimage.pending]: (state) => {
      state.loading = true;
    },
    [deleteGalleryimage.fulfilled]: (state, action) => {
      state.loading = false;
      state.gallery = action.payload;
    },
    [deleteGalleryimage.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

const GalleryReducer = GallerySlice.reducer;

export default GalleryReducer;

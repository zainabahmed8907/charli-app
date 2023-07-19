import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { apiServices } from "../../services/apiServices/Api";

//get chapters
export const getChapters = createAsyncThunk("chapters/getChapters", (id) => {
  const chapters = apiServices
    .get(`/outlines/${id}`)
    .then((response) => response);
  return chapters;
});

//post chapters
export const postChapters = createAsyncThunk(
  "chapters/postChapters",
  (chapter) => {
    const chapters = apiServices
      .post(`/chapters`, chapter.data)
      .then((response) => response)
      .catch((err) => console.log(err));
    return chapters;
  }
);
//delete chapters
export const deleteChapter = createAsyncThunk(
  "chapters/deleteChapter",
  (id) => {
    const chapters = apiServices
      .delete(`/chapters/${id}`)
      .then((response) => response)
      .catch((err) => console.log(err));

    console.log("deleted chapter payload", chapters);
    return chapters;
  }
);

//update chapter
export const updateChapter = createAsyncThunk(
  "chapters/updateChapter",
  ({ id, data }) => {
    const chapter = apiServices
      .update(`/chapters/${id}`, data)
      .then((response) => {
        return response;
      });

    return chapter;
  }
);
//get chapters list

export const getChaptersList = createAsyncThunk(
  "chapters/getChaptersList",
  () => {
    const chapters = apiServices.get(`/chapters`).then((response) => response);

    console.log("all chapters", chapters);

    return chapters;
  }
);
const initialState = {
  chapters: [],
  loading: false,
  error: false,
  allChapters: [],
};

const ChapterSlice = createSlice({
  name: "chapters",
  initialState,
  extraReducers: {
    [getChapters.pending]: (state) => {
      state.loading = true;
    },
    [getChapters.fulfilled]: (state, action) => {
      state.loading = false;
      state.chapters = [action.payload];
    },
    [getChapters.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    [getChaptersList.pending]: (state) => {
      state.loading = true;
    },
    [getChaptersList.fulfilled]: (state, action) => {
      state.loading = false;
      state.allChapters = [action.payload];
    },
    [getChaptersList.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    [postChapters.pending]: (state) => {
      state.loading = true;
    },
    [postChapters.fulfilled]: (state, action) => {
      state.loading = false;
      state.chapters = [action.payload];
      message.success("Chapter Created successfully");
    },
    [postChapters.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
      message.error("Chapter not created");
    },
    [deleteChapter.pending]: (state) => {
      state.loading = true;
    },
    [deleteChapter.fulfilled]: (state, action) => {
      state.loading = false;
      state.chapters = action.payload;
      message.success("chapter deleted successfully");
    },
    [deleteChapter.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.error("chapter not deleted");
    },
    [updateChapter.pending]: (state) => {
      state.loading = true;
    },
    [updateChapter.fulfilled]: (state, action) => {
      state.loading = false;
      state.chapters = [...state.chapters, [action.payload]];
      message.success("chapter updated successfully");
    },
    [updateChapter.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.success("chapter not updated");
    },
  },
});

const ChpaterReducer = ChapterSlice.reducer;

export default ChpaterReducer;

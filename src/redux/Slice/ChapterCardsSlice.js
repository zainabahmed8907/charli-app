import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { apiServices } from "../../services/apiServices/Api";
import { deleteChapter } from "./ChapterSlice";

//get chapter Cards
export const getChapterCards = createAsyncThunk(
  "chaptercard/getChapterCards",
  () => {
    const chaptercards = apiServices
      .get(`/chapters-cards`)
      .then((response) => response)
      .catch((err) => err);
    return chaptercards;
  }
);

//post chapters
export const postChapterCards = createAsyncThunk(
  "chaptercard/postChapterCard",
  (card) => {
    const chaptercards = apiServices
      .post(`/chapters-cards`, card.data)
      .then((response) => response)
      .catch((err) => console.log(err));


    return chaptercards;
  }
);

//delete chapter card
export const deleteChapterCard = createAsyncThunk(
  "chapters/deleteChapterCard",
  (id) => {
    const chapters = apiServices
      .delete(`/chapters-cards/${id}`)
      .then((response) => response)
      .catch((err) => console.log(err));

    console.log("deleted card payload", chapters);
    return chapters;
  }
);

//update chapter card
export const updateChapterCard = createAsyncThunk(
  "chaptercard/updateChapterCard",
  ({ id, data }) => {
    const chapterCard = apiServices
      .update(`/chapters-cards/${id}`, data)
      .then((response) => {
        console.log("update chapter card", response);
        return response;
      })
      .catch((err) => err);

    return chapterCard;
  }
);

//
export const postTodos = createAsyncThunk(
  "chaptercard/postTodos",
  (todo) => {
    const chapterCard = apiServices
      .post(`/card-tasks`, todo.data)
      .then((response) => {
        console.log("todo card", response);
        return response;
      })
      .catch((err) => err);

    return chapterCard;
  }
);
const initialState = {
  chapterCards: [],
  loading: false,
  todos: [],
  error: false,
};

const ChapterSlice = createSlice({
  name: "chaptercard",
  initialState,
  extraReducers: {
    [getChapterCards.pending]: (state) => {
      state.loading = true;
    },
    [getChapterCards.fulfilled]: (state, action) => {
      state.loading = false;
      state.chapterCards = [action.payload];
    },
    [getChapterCards.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },


    [postChapterCards.pending]: (state) => {
      state.loading = true;
    },
    [postChapterCards.fulfilled]: (state, action) => {
      state.loading = false;
      state.chapterCards = [action.payload];
      message.success("Chapter Card created successfully");
    },
    [postChapterCards.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.error("Chapter Card not created");
    },

    //edit chapter card

    [updateChapterCard.pending]: (state, action) => {
      state.loading = true;
    },
    [updateChapterCard.fulfilled]: (state, action) => {
      state.chapterCards = [action.payload];
      state.loading = false;
      message.success("Chapter card updated successfully");
    },
    [updateChapterCard.rejected]: (state, action) => {
      state.chapterCards = [];
      state.error = action.payload;
      message.error("Chapter card not updated");

    },

    //post todos

    [postTodos.pending]: (state, action) => {
      state.loading = true;
    },
    [postTodos.fulfilled]: (state, action) => {
      state.todos = [action.payload];
      state.loading = false;
      message.success("Todo has been created");
    },
    [postTodos.rejected]: (state, action) => {
      state.chapterCards = [];
      state.error = action.payload;
      message.error("Todo not created");
    },

    //delete chapter card
    [deleteChapterCard.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteChapterCard.fulfilled]: (state, action) => {
      state.chapterCards = action.payload;
      state.loading = false;
      message.success("Chapter Card deleted succesfully");
    },
    [deleteChapterCard.rejected]: (state, action) => {
      state.chapterCards = [];
      state.error = action.payload;
      message.error('Chapter Card not deleted');
    },
  },
});

const ChpaterCardReducer = ChapterSlice.reducer;

export default ChpaterCardReducer;

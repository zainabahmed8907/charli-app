import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { apiServices } from "../../services/apiServices/Api";

//post
export const postBookData = createAsyncThunk("books/postBookData", (books) => {
  const booksData = apiServices
    .post(`/books`, books.data)
    .then((response) => response.data);
  return booksData;
});

//get books data
export const getBookData = createAsyncThunk("books/getBookData", () => {
  const booksData = apiServices
    .get(`/books-list`)
    .then((response) => response)
    .then(({ data }) => {
      let result = data?.map((obj) => ({
        ...obj,
        value: obj.id,
        label: obj.book_name,
      }));
      return result;
    });

  return booksData;
});

//delete a boook
export const deleteBooksData = createAsyncThunk(
  "books/deleteBooksData",
  (id) => {
    const deleteBook = apiServices
      .delete(`/books/${id}`)
      .then((response) => {
        if (response.success) {
          // message.success(response.message);
        } else {
          message.error(response.message);
        }
        return response.data;
      })
      .catch((err) => console.log(err));

    return deleteBook;
  }
);
export const updateBook = createAsyncThunk(
  "books/updateBook",
  ({ id, data }) => {
    const bookData = apiServices
      .update(`/books/${id}`, data)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((err) => err);
    return bookData;
  }
);
const initialState = {
  book_data: [],
  loading: false,
  error: false,
};

const BookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setEdit: (state, action) => {
      state.edit = action.payload.edit;

      state.body = action.payload.body;
    },
  },
  extraReducers: {
    [postBookData.pending]: (state) => {
      state.loading = true;
    },
    [postBookData.fulfilled]: (state, action) => {
      state.loading = false;
      state.book_data = [action.payload];
      message.success("book created successfully");
    },
    [postBookData.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.err("book not created");
    },
    [getBookData.pending]: (state) => {
      state.loading = true;
    },
    [getBookData.fulfilled]: (state, action) => {
      state.loading = false;
      state.book_data = [action.payload];
    },
    [getBookData.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },

    [deleteBooksData.pending]: (state) => {
      state.loading = true;
    },
    [deleteBooksData.fulfilled]: (state, action) => {
      state.loading = false;
      state.book_data = [action.payload];
      message.success("book deleted successfully");
    },
    [deleteBooksData.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.error("book not deleted");

    },
    [updateBook.pending]: (state) => {
      state.loading = true;
    },
    [updateBook.fulfilled]: (state, action) => {
      state.loading = false;
      state.book_data = [...state.book_data, [action.payload]];
      message.success("book updated successfully");
    },
    [updateBook.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
      message.error("book not updated");
    },
  }
});

const BookReducer = BookSlice.reducer;
export const { setEdit } = BookSlice.actions;

export default BookReducer;

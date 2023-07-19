import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { apiServices } from "../../services/apiServices/Api";

//get users
export const getUsers = createAsyncThunk("user/getUsers", () => {
  const user = apiServices.get(`/users`).then((response) => {
    return response;
  });
  return user;
});

//search users
export const searchUsers = createAsyncThunk("user/searchUsers", (name) => {
  const user = apiServices
    .get(`/users?search=${name}`)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      message.err("No user found");
    });
  console.log("search user", user);
  return user;
});

//edit user fields

export const editUsers = createAsyncThunk(
  "user/editUsers",
  ({ field_name, field_value }) => {
    console.log(field_name, field_value);
    const payload = { field_name, field_value };
    const user = apiServices
      .post(`/edit-user-fields`, payload)
      .then((response) => {
        if (response.success) {
          message.success(response.msg);
        } else {
          message.error(response.msg);
        }
        console.log("RESPONSE", response);
        return response;
      })
      .catch((err) => {
        message.err("Updated Failed");
      });
    return user;
  }
);

const initialState = {
  users: [],
  loading: false,
  error: false,
  searchData: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = [action.payload];
    },
    [getUsers.rejected]: (state, action) => {
      state.loading = true;
      state.error = [action.payload];
      state.users = [];
    },

    //SEARCH USERS
    [searchUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [searchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.searchData = [action.payload];
    },
    [searchUsers.rejected]: (state) => {
      state.loading = true;
    },

    //edit users
    [editUsers.pending]: (state) => {
      state.loading = true;
    },
    [editUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = [action.payload];

      console.log("edit payload", action.payload);
    },
    [editUsers.rejected]: (state) => {
      state.loading = true;
    },
  },
});

const UserReducer = userSlice.reducer;
export default UserReducer;

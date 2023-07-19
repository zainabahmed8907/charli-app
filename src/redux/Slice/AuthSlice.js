import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import { apiServices } from "../../services/apiServices/Api";

//post login

export const postLoginData = createAsyncThunk(
  "login/postLoginData",
  (login, { rejectWithValue }) => {
    const logindata = apiServices
      .post("/login", login.data)
      .then((response) => {
        localStorage.setItem("token", response.access_token);

        return response;
      })

      .catch((err) => rejectWithValue(err.response.data));

    return logindata;
  }
);

// get current user
export const getCurrentUser = createAsyncThunk("login/getCurrentUser", () => {
  const logindata = apiServices
    .get("/get-current-user")
    .then((response) => {
      return response;
    })

    .catch((err) => console.log(err));
  return logindata;
});

//logout
export const LogoutFunc = createAsyncThunk("login/LogoutFunc", () => {
  const logoutData = apiServices
    .post("/logout")
    .then((response) => {
      return response;
    })

    .catch((err) => console.log(err));
  return logoutData;
});

//sign up
export const signUpFunc = createAsyncThunk("login/signUpFunc", (signup) => {
  const signupData = apiServices
    .post("/register", signup.data)
    .then((response) => {
      return response;
    })

    .catch((err) => console.log(err));
  return signupData;
});

const initialState = {
  auth: false,
  token: null,
  loading: false,
  error: "",
  user: [],
  success: null,
  isLoggedIn: null,
  test: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,

  extraReducers: {
    [postLoginData.pending]: (state) => {
      state.loading = true;
      state.auth = false;
    },
    [postLoginData.fulfilled]: (state, action) => {
      state.auth = true;
      state.loading = false;
      state.token = action.payload;
      state.user = [action.payload.user];
      state.isLoggedIn = true;
      state.success = true;
    },
    [postLoginData.rejected]: (state, action) => {
      state.loading = true;
      state.auth = false;
      state.error = "One of the credentials are incorrect";
      state.isLoggedIn = false;
      state.success = false;
      console.log("failed payload", action.payload);
      if (state.success === false) {
        state.loading = false;
        message.error("Invalid Credentials");
      }
    },

    // get Current User
    [getCurrentUser.pending]: (state) => {
      state.loading = true;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = [action.payload];
    },
    [getCurrentUser.rejected]: (state, action) => {
      state.loading = true;
      state.error = "No user found";

      state.user = [action.payload];
    },

    // logout

    [LogoutFunc.pending]: (state) => {
      state.loading = true;
    },
    [LogoutFunc.fulfilled]: (state, action) => {
      state.auth = false;
      state.loading = false;
      state.isLoggedIn = false;
    },
    [LogoutFunc.rejected]: (state) => {
      state.loading = true;
      state.error = "failed to logout";
    },

    //register
    [signUpFunc.pending]: (state) => {
      state.loading = true;
      state.auth = false;
    },
    [signUpFunc.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.success = true;
    },
    [signUpFunc.rejected]: (state) => {
      state.loading = true;
      state.auth = false;
      state.error = "failed to sign up";
      state.success = false;
    },
  },
});

const AuthReducer = AuthSlice.reducer;

export default AuthReducer;

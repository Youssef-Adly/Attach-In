import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logout,
  registerAsStudent,
  updateUserInfo,
} from "../actions/authActions";

const initialState = {
  user: null,
  error: null,
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.user = payload;
    },
    setToken: (state, { payload }) => {
      state.user = { ...state.user, token: payload };
    },
  },
  extraReducers: (builder) => {
    ////////////////////////////////////////////////
    // Register
    builder
      .addCase(registerAsStudent.fulfilled, (state, action) => {
        let user = {
          ...action.payload.data.user,
          university: action.payload.data.university,
        };
        state.user = {
          ...user,
          token: action.payload.data.token,
          collage: action.payload.data.collage,
        };
        console.log("user ", {
          ...user,
          token: action.payload.data.token,
          collage: action.payload.data.collage,
        });
        state.error = null;
      })
      .addCase(registerAsStudent.rejected, (state, action) => {
        state.user = null;
        // console.log("action.payload: ", action);
        state.error = action.payload;
      });
    ////////////////////////////////////////////////
    // Login
    builder
      .addCase(login.fulfilled, (state, action) => {
        let user = {
          ...action.payload.data.user,
          university: action.payload.data.university,
        };
        state.user = {
          ...user,
          token: action.payload.data.token,
          collage: action.payload.data.collage,
        };
        console.log("user Login : ", {
          ...user,
          token: action.payload.data.token,
          collage: action.payload.data.collage,
        });
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        // console.log("action.payload: ", action);
        state.error = action.payload;
      });
    ////////////////////////////////////////////////
    // Logout
    builder
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.error = null;
        console.log("logout: ", action.payload);
      })
      .addCase(logout.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
        // console.log("action.payload: ", action);
      });
    ////////////////////////////////////////////////
    // updateUserInfo
    builder
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload.data };
        state.error = null;
        // console.log("action.payload: ", action.payload);
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        // state.user = null;
        state.error = action.payload;
        // console.log(" action.payload: ", action.payload);
      });
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setToken } = AuthSlice.actions;

export default AuthSlice.reducer;

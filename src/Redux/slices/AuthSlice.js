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
    setGuest: (state, { payload }) => {
      state.user = {
        id: 0,
        user_type: "guest",
        full_name: "Guest",
        university: {},
        collage: {},
        governorate: {},
        email: "",
        phone: "",
        profile_photo: null,
        profile_cover: null,
        address: null,
        bio: null,
        about: null,
        birthday: null,
        interests: [],
        skills: [],
        certifications: [],
        experiences: [],
        token: null,
        is_active: 1,
      };
    },
    setActive: (state) => {
      state.user = { ...state.user, is_active: 1 };
    },
  },
  extraReducers: (builder) => {
    ////////////////////////////////////////////////
    // Register
    builder
      .addCase(registerAsStudent.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerAsStudent.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
      });
    ////////////////////////////////////////////////
    // Login
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
      });
    ////////////////////////////////////////////////
    // Logout
    builder
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.error = null;
        // console.log("logout: ", action.payload);
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
export const { setAuth, setGuest, setActive } = AuthSlice.actions;

export default AuthSlice.reducer;

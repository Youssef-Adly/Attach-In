// authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "https://attachin.com/api";

export const registerAsStudent = createAsyncThunk(
  "auth/registerAsStudent",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post(baseURL + "/registerAsStudent", user);
      const data = await res.data;
      console.log("1st data: ", data);
      // User Info Data
      const userInfo = await axios.post(
        baseURL + "/userInfo",
        {
          for_user_id: data.data.user.id,
        },
        {
          headers: { Authorization: `Bearer ${data.data.token}` },
        }
      );
      const userInfoData = await userInfo.data;
      console.log("2st userInfoData: ", userInfoData);
      return {
        ...data.data.user,
        token: data.data.token,
        ...userInfoData.data,
      };
      // return data;
    } catch (err) {
      // console.log("err: ", err);
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const res = await axios.post(baseURL + "/login", {
      ...user,
      language: "en",
      version: "231",
      platform: "Ios",
      device_id: "1231",
    });
    const data = await res.data;
    // console.log("1st data: ", data);
    // User Info Data
    const userInfo = await axios.post(
      baseURL + "/userInfo",
      {
        for_user_id: data.data.user.id,
      },
      {
        headers: { Authorization: `Bearer ${data.data.token}` },
      }
    );
    const userInfoData = await userInfo.data;
    // console.log("2st userInfoData: ", userInfoData);
    // combine user Data
    return { ...data.data.user, token: data.data.token, ...userInfoData.data };
  } catch (err) {
    // console.log("err: ", err);
    return thunkAPI.rejectWithValue(err.response.data.errors);
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post(baseURL + "/logOut", user?.token);
      const data = await res.data;
      return data;
    } catch (err) {
      // console.log("err: ", err);
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);
export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (user, thunkAPI) => {
    try {
      const res = await axios.post(
        baseURL + "/userInfo",
        { for_user_id: user.id },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      const data = await res.data;
      console.log("data: ", data);
      return data;
    } catch (err) {
      console.log("err: ", err);
      return thunkAPI.rejectWithValue(err.response.data.errors);
    }
  }
);

// export const startLogoutTimer = () => (dispatch) => {
//   setTimeout(() => {
//     localStorage.removeItem("token");
//     dispatch(logout());
//   }, 9 * 60 * 60 * 1000);
// };

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
      return data;
    } catch (err) {
      // console.log("err: ", err);
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

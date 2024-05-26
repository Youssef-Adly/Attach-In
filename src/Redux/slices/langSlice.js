import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "en",
};

export const langSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state, { payload }) => {
      state.value = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleLanguage } = langSlice.actions;

export default langSlice.reducer;

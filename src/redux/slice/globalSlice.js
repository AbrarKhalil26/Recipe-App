import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  isToastOpen: false,
  toast: {
    type: "",
    message: "",
  },
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    TOGGLE_DARK_MODE: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    TOGGLE_TOAST: (state, action) => {
      state.isToastOpen = action.payload.isOpen;
      state.toast = {
        type: action.payload.type || "success",
        message: action.payload.message || "",
      };
    },
  },
});

export const { TOGGLE_DARK_MODE, TOGGLE_TOAST } = globalSlice.actions;
export default globalSlice.reducer;

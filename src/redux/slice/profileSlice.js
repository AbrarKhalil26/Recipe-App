import { createSlice } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../db/config";

const storedUser = JSON.parse(sessionStorage.getItem("user")) || {};
const initialState = {
  userID: storedUser.userID,
  lovingMeals: [],
  listCart: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    ADD_LOVING_MEAL: (state, action) => {
      state.lovingMeals.push(action.payload);
    },
    REMOVE_LOVING_MEAL: (state, action) => {
      state.lovingMeals = state.lovingMeals.filter((meal) => meal !== action.payload);
    },
    ADD_LIST_CART: (state, action) => {
      state.listCart.push(action.payload);
    },
    REMOVE_LIST_CART: (state, action) => {
      state.listCart = state.listCart.filter((meal) => meal !== action.payload);
    },
    SET_PROFILE_DATA: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { 
  ADD_LOVING_MEAL, 
  REMOVE_LOVING_MEAL, 
  ADD_LIST_CART, 
  REMOVE_LIST_CART,
  SET_PROFILE_DATA 
} = profileSlice.actions;

export const selectLovingMeals = state => state.profile.lovingMeals;
export const selectListCart = state => state.profile.listCart;

export default profileSlice.reducer;

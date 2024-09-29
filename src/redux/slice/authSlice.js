import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../db/config";

const storedUser = JSON.parse(sessionStorage.getItem('user')) || {};

const initialState = {
  isLoggedIn: !!storedUser.userID,
  ...storedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      Object.assign(state, action.payload, { isLoggedIn: true });
      sessionStorage.setItem('user', JSON.stringify(state));
    },
    UPDATE_ACTIVE_USER: (state, action) => {
      Object.assign(state, action.payload);
      sessionStorage.setItem('user', JSON.stringify(state));
    },
    REMOVE_ACTIVE_USER: (state) => {
      Object.keys(state).forEach(key => state[key] = null);
      state.isLoggedIn = false;
      sessionStorage.removeItem('user');
    },
  },
});

export const fetchUserDataFromFirestore = (userEmail) => async (dispatch) => {
  try {
    const userQuery = query(collection(db, "users"), where("email", "==", userEmail));
    const userSnapshot = await getDocs(userQuery);
    const userData = userSnapshot.docs.map(doc => ({ ...doc.data(), userID: doc.id }))[0];

    if (userData) {
      dispatch(SET_ACTIVE_USER(userData));
    }
  } catch (error) {
    console.error("Error fetching user data from Firestore:", error);
  }
};

export const { SET_ACTIVE_USER, UPDATE_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUserID = state => state.auth.userID;
export const selectUserName = state => state.auth.userName;
export const selectEmail = state => state.auth.email;
export const selectPhone = state => state.auth.phone;
export const selectCountry = state => state.auth.country;
export const selectAddress = state => state.auth.address;
export const selectProfilePic = state => state.auth.profilePic;

export default authSlice.reducer;

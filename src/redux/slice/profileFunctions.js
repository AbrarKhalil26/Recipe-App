import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../db/config";

export const saveProfileToFirestore = createAsyncThunk(
  "profile/saveProfileToFirestore",
  async (profileData, { getState, rejectWithValue }) => {
    const { profile } = getState(); 
    const userID = profile.userID;
    
    try {
      await setDoc(doc(db, "profiles", userID), profileData); 
      return profileData; 
    } catch (error) {
      console.error("Error saving profile to Firestore:", error);
      return rejectWithValue(error.message); 
    }
  }
);

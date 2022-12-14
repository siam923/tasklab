import { createSlice } from "@reduxjs/toolkit";
import { signup, signin } from "./userAction";

const userToken = localStorage.getItem("profile")
  ? JSON.parse(localStorage.getItem("profile")).token
  : null;

const userInfo = localStorage.getItem("profile")
  ? JSON.parse(localStorage.getItem("profile")).result
  : null;

const initialState = {
  loading: false,
  userInfo, // for user object
  userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, action) {
      localStorage.clear();
      state.userInfo = null;
      state.userToken = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    clearState(state) {
      state.success = false;
      state.error = false;
      state.loading = false;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signin.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload.result;
        state.userToken = action.payload.token;
      });
  },
});

export const { logout, clearState } = userSlice.actions;
export default userSlice.reducer;
export const userSelector = (state) => state.user;

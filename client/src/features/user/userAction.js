import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/index.js";

export const signup = createAsyncThunk(
  "user/signup",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await api.signUp({
        firstName,
        lastName,
        email,
        password,
      });
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const signin = createAsyncThunk(
  "user/signin",
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await api.signIn({ email, password });
      localStorage.setItem("profile", JSON.stringify(data));
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

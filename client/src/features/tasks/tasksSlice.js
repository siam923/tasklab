import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as api from "../../api";

const initialState = {
  tasks: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed
  error: null,
};

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  try {
    const { data } = await api.fetchTasks();
    return data;
  } catch (err) {
    return err.message;
  }
});

export const getTasksBySearch = createAsyncThunk(
  "tasks/getTasksBySearch",
  async (query) => {
    try {
      const {
        data: { data },
      } = await api.fetchTasksBySearch(query);
      console.log(data);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const postTask = createAsyncThunk("type/postTask", async (data) => {
  try {
    const res = await api.createTask(data);
    return res.data;
  } catch (err) {
    console.error(err);
    return err.message;
  }
});

export const updateTask = createAsyncThunk(
  "type/updateTask",
  async (initialTask) => {
    const { _id } = initialTask;
    try {
      const res = await api.updateTask(_id, initialTask);
      return res.data;
    } catch (err) {
      console.error(err);
      return err.message;
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (initialTask) => {
    const { id } = initialTask;
    try {
      const response = await api.deleteTask(id);
      if (response?.status === 200) return initialTask;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);
export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTasks.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedTasks = action.payload;
        state.tasks = loadedTasks;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(postTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { _id } = action.payload;
        const tasks = state.tasks.filter((task) => task._id !== _id);
        state.tasks = [...tasks, action.payload];
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { id } = action.payload;
        console.log("id:", id);
        const tasks = state.tasks.filter((task) => task._id !== id);
        state.tasks = tasks;
      })
      .addCase(getTasksBySearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedTasks = action.payload;
        state.tasks = loadedTasks;
      });
  },
});

export const { create } = tasksSlice.actions; //create action is automatically created
export default tasksSlice.reducer;

export const selectAllTasks = (state) => state.tasks.tasks; //globals state can have {tasks:{tasks:..,status}, users}
export const getTasksStatus = (state) => state.tasks.status;
export const getTasksError = (state) => state.tasks.error;
export const selectTaskById = (state, taskId) =>
  state.tasks.tasks.find((task) => task._id === taskId);

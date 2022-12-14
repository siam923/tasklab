import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../features/tasks/tasksSlice";
import userReducer from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
  },
  //middleware: getDefaultMiddleware
});

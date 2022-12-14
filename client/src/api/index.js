import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchTasks = () => API.get("/tasks");
export const fetchTasksBySearch = (query) =>
  API.get(`/tasks/search?searchQuery=${query.search || "none"}`);
export const createTask = (newPost) => API.post("/tasks", newPost);

export const updateTask = (id, updatedTask) =>
  API.put(`/tasks/${id}`, updatedTask);

export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const signIn = (userData) => API.post(`/users/signin`, userData);
export const signUp = (userData) => API.post(`/users/signup`, userData);

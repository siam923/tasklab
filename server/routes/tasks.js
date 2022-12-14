import express, { Router } from "express";
import auth from "../middleware/auth.js";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTasksBySearch,
} from "../controllers/tasks.js";

const router = express.Router();
//like urls file in django
router.get("/", getTasks);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);
router.get("/search", getTasksBySearch);

export default router;

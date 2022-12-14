import mongoose from "mongoose";
import Task from "../models/task.js";

export const getTasks = async (req, res) => {
  console.log("Get request received");
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTasksBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  console.log("Search request received", searchQuery);
  try {
    const title = new RegExp(searchQuery, "i"); //ii menas ignore case
    //all task with the search term
    const tasks = await Task.find({ $or: [{ title }] });
    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  const task = req.body;
  console.log("Post request received");
  const newTask = new Task({
    ...task,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  }); //userid from middleware
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id: _id } = req.params; //rename id to _id
  const task = req.body;
  console.log("Update request received : ", task);
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedTask = await Task.findByIdAndUpdate(
    _id,
    { ...task, _id },
    { new: true }
  );

  res.json(updatedTask);
};

export const deleteTask = async (req, res) => {
  const { id: _id } = req.params;
  console.log("Delete request received");
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  await Task.findByIdAndRemove(_id);

  res.json({ message: "Task deleted" });
};

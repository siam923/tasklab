import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: String,
  details: String,
  name: String,
  creator: String,
  tags: [String], //array of string
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;

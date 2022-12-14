import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTask, selectTaskById, updateTask } from "./tasksSlice";
import FormInput from "../../components/FormInput";

const TaskForm = ({ currentId, setCurrentId }) => {
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const task = useSelector((state) =>
    currentId ? selectTaskById(state, currentId) : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  const [taskData, setTaskData] = useState({
    title: "",
    details: "",
    tags: "",
  });

  useEffect(() => {
    if (task) setTaskData(task);
  }, [task]);

  const dispatch = useDispatch();
  const canSave =
    [taskData.title, taskData.details].every(Boolean) &&
    addRequestStatus === "idle";
  const inputs = [
    {
      id: 1,
      name: "title",
      type: "text",
      label: "Title",
    },
    {
      id: 2,
      name: "details",
      type: "text",
      label: "Details",
    },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      try {
        // setAddRequestStatus("pending");
        // console.log(taskData);
        dispatch(
          updateTask({ _id: currentId, ...taskData, name: user?.result?.name })
        ).unwrap();
      } catch (err) {
        console.log("Failed to updatetask", err);
      } finally {
        setAddRequestStatus("idle");
      }
    } else {
      if (canSave) {
        try {
          console.log("on ui", taskData);
          setAddRequestStatus("pending");
          dispatch(
            postTask({ ...taskData, name: user?.result?.name })
          ).unwrap();
        } catch (err) {
          console.log("Failed to add task", err);
        } finally {
          setAddRequestStatus("idle");
        }
      } else {
        alert("Please fill all the form");
      }
    }
    clear();
  };

  const onChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const clear = () => {
    setCurrentId(null);
    setTaskData({
      title: "",
      details: "",
      tags: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <div
        className="bg-blue-100 shadow-lg border border-blue-400 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3"
        role="alert"
      >
        Please sign in to add your task and edit your own task
      </div>
    );
  }

  return (
    <div className="container bg-slate-50 shadow-lg p-6">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h6>{currentId ? "Editing a task" : "Creating a new task"}</h6>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={taskData[input.name]}
            onChange={onChange}
          />
        ))}
        <FormInput
          key={4}
          name="tags"
          type="text"
          label="Tags"
          value={taskData["tags"]}
          onChange={(e) =>
            setTaskData({ ...taskData, tags: e.target.value.split(",") })
          }
        />
        <button className="w-full rounded-lg text-white cursor-pointer p-2 text-lg mt-4 mb-1 bg-purple-800">
          Submit
        </button>
        <button
          onClick={clear}
          className="w-full rounded-lg text-white cursor-pointer p-2 text-lg mt-4 mb-2 bg-blue-800"
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

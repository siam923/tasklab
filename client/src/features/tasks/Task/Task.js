import React, { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../tasksSlice";
import { userSelector } from "../../user/userSlice";

const Task = ({ task, setCurrentId }) => {
  const dispatch = useDispatch();
  const [requestStatus, setRequestStatus] = useState("idle");
  const { userInfo, userToken } = useSelector(userSelector);

  const onDelete = () => {
    try {
      setRequestStatus("pending");
      dispatch(deleteTask({ id: task._id })).unwrap();
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };
  return (
    <div className="block w-full rounded-lg  bg-white p-6 shadow-lg border-t-blue-800 border border-t-4">
      <h5 className="text-gray-900 text-lg leading-tight font-medium mb-2">
        {task.title}
      </h5>
      <p className="text-gray-900 text-xs leading-tight font-medium mb-2">
        by <strong>{task.name} </strong>&ensp;{moment(task.createdAt).fromNow()}
      </p>
      <p></p>
      <p className="text-gray-700 text-base mb-2">{task.details}</p>
      <p className="text-gray-700 text-xs">
        {task.tags && task.tags.map((tag) => `#${tag}`)}
      </p>
      {userInfo && (
        <div className="grid gap-2 grid-cols-2">
          <button
            type="button"
            onClick={() => setCurrentId(task._id)}
            className=" inline-block px-3 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            className=" inline-block px-3 py-1.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Task;

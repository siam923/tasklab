import Task from "./Task/Task.js";
import { useSelector } from "react-redux";
import { selectAllTasks } from "./tasksSlice";

const Tasks = ({ currentId, setCurrentId }) => {
  const tasks = useSelector(selectAllTasks);

  return !tasks.length ? (
    <p>No task found. Please add tasks.</p>
  ) : (
    <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <div className="flex justify-between" key={task._id}>
          <Task id={task._id} task={task} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
};

export default Tasks;

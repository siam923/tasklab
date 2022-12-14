import React, { useState, useEffect } from "react";
import TaskForm from "../../features/tasks/TaskForm";
import Tasks from "../../features/tasks/Tasks";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, getTasksBySearch } from "../../features/tasks/tasksSlice";
import { useLocation, useNavigate } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // search task
      searchTask();
    }
  };

  const searchTask = () => {
    if (search.trim()) {
      dispatch(getTasksBySearch({ search }));
      navigate(`/tasks/search?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };

  return (
    <main className="container relative">
      <div className="container grid gap-4 justify-center  sm:grid-cols-12 ">
        <div className=" col-span-5">
          <div className="flex justify-center">
            <div className="mb-3 min-w-sm">
              <div className="input-group relative flex flex-wrap ">
                <input
                  className="form-control relative flex-auto min-w-0 block  px-6 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={search}
                  type="text"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  label="search"
                  onKeyPress={handleKeyPress}
                />
                <button
                  onClick={searchTask}
                  className="btn items-center rounded bg-blue-600 px-6 py-2.5 text-xs font-medium leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                  type="button"
                  id="button-addon2"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    class="w-4"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <TaskForm currentId={currentId} setCurrentId={setCurrentId} />
        </div>
        <div className=" col-span-7">
          <Tasks setCurrentId={setCurrentId} />
        </div>
      </div>
    </main>
  );
}

export default Home;

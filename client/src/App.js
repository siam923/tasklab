import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { useEffect, useState } from "react";
import { fetchTasks } from "./api";

const Test = () => {
  const [data, setdata] = useState([]);
  const [sta, setsta] = useState(true);

  useEffect(() => {
    const rdata = JSON.parse(localStorage.getItem("profile")).result;
    console.log(rdata);
    console.log(data);
  }, [sta]);
  return (
    <>
      <button onClick={() => setsta(!sta)}>Click me!</button>
    </>
  );
};

const App = () => {
  return (
    <div className="min-h-full bg-slate-200">
      <Navbar />
      <div className="container min-h-screen mx-auto px-4 ">
        <Routes classNames="h-screen">
          <Route path="/" exact element={<Navigate to="/tasks" />} />
          <Route path="/tasks" exact element={<Home />} />
          <Route path="/tasks/search" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route path="/test" exact element={<Test />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

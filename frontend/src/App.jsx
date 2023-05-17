import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Problem from "./components/Problem";
import Practice from "./components/Practice";
import Register from "./components/Register";
import Login from "./components/Login";
import AddProblem from "./components/AddProblem";
import "./App.css";
import PyComp from "./components/PyComp";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u && u !== "") {
      setUser(u);
    } else {
      localStorage.setItem("user", "");
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        {/* <Route path="/problem" element={<Problem />} /> */}
        <Route path="/addproblem" element={<AddProblem />} />
        <Route path="/problem" element={<Practice />} />
        <Route path="/problem/:qid" element={<Problem user={user} />} />
        <Route path="/py" element={<PyComp />} />
      </Routes>
    </div>
  );
}

export default App;

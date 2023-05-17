import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CodeChampServices from "../services/CodeChampServices";

export default function Login({setUser}) {
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  return (
    <div className="container my-5">
      <h1 className="text-center">Login</h1>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email id
        </label>
        <input
          value={email}
          type="text"
          className="form-control"
          id="email"
          onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Password:
        </label>
        <input
          value={password}
          type="password"
          className="form-control"
          id="pass"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
      <p className="text-center">
        Don't an account? <Link to="/register">Register Here</Link>
      </p>
    </div>
  );
  async function handleLogin() {
    const response = await CodeChampServices.postLogin({
      email: email,
      password: password,
    });

    if (response.status == 200) {
      localStorage.setItem("user", email);
      setUser(email);
      navigate("/problem");
    }
  }
}

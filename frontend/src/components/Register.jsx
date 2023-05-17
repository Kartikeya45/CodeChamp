import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CodeChampServices from "../services/CodeChampServices";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div className="container my-5">
      <h1 className="text-center">Register</h1>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
        </label>
        <input
          value={name}
          type="text"
          className="form-control"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email Id:
        </label>
        <input
          value={email}
          type="email"
          className="form-control"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
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
      <button
        type="submit"
        className="btn btn-primary"
        onClick={handleRegister}
      >
        Register
      </button>
      <p className="text-center">
        Already have an account? <Link to="/login">Login Here</Link>
      </p>
    </div>
  );

  async function handleRegister() {
    const response = await CodeChampServices.registerUser({
      email: email,
      password: password,
      name: name,
    });
    if (response.status === 200) {
      alert("Registered Successfully");
      navigate("/login");
    } else {
      alert(response.data.message);
    }
  }
}

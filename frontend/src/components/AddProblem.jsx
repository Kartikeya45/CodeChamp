import React, { useState } from "react";
import CodeChampServices from "../services/CodeChampServices";
export default function AddProblem() {
  const [qid, setQid] = useState(0);
  const [description, setDescription] = useState("");
  const [test_input, setTest_input] = useState("");
  const [test_output, setTest_output] = useState("");
  const [title, setTitle] = useState("");
  const [solution, setSolution] = useState("");
  const addProblem = async () => {
    const data = {
      Qid: qid,
      description: description,
      title: title,
      test_input: test_input,
      test_output: test_output,
      solution: solution,
    };
    const response = await CodeChampServices.postProblem(data);
    if (response.status !== 201) alert("Could not add");
    else {
      alert("added question successfully");
      setQid("");
      setDescription("");
      setTest_input("");
      setTest_output("");
      setTitle("");
      setSolution("");
    }
  };
  return (
    <div className="container">
      <h1 className="text-center">Add problem</h1>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Qid
        </label>
        <input
          value={qid}
          type="number"
          className="form-control"
          id="qid"
          onChange={(e) => setQid(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Title:
        </label>
        <input
          value={title}
          className="form-control"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Description:
        </label>
        <textarea
          value={description}
          className="form-control"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Test case input:
        </label>
        <textarea
          value={test_input}
          className="form-control"
          id="tin"
          onChange={(e) => setTest_input(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Test case output:
        </label>
        <textarea
          value={test_output}
          className="form-control"
          id="tout"
          onChange={(e) => setTest_output(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Solution:
        </label>
        <textarea
          value={solution}
          className="form-control"
          id="soln"
          onChange={(e) => setSolution(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={addProblem}>
        Add
      </button>
    </div>
  );
}

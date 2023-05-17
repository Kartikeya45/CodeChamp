import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Editor from "./Editor";
import ProblemDescription from "./ProblemDescription";
import Services from "../services/CodeChampServices";
import ProblemEditorial from "./ProblemEditorial";
import ProblemSubmissions from "./ProblemSubmissions";

export default function Problem({ user }) {
  const { qid } = useParams();
  const [problem, setProblem] = useState("");
  const [solutionState, setSolutionState] = useState({state: "Not Submitted", output: ""});
  useEffect(() => {
    handleGetProblem();
  }, [qid]);

  const [problemOption, setProblemOption] = useState("Description");
  return (
    problem && (
      <div>
        <div className="row ">
          <div className="col-6 gx-5 gy-4">
            <div className="problem-options row g-0 ">
              <div
                onClick={handlePOChange}
                className={`col text-center ${
                  problemOption === "Description" && "problem-option-active"
                }`}
              >
                Description
              </div>
              <div
                onClick={handlePOChange}
                className={`col text-center ${
                  problemOption === "Editorial" && "problem-option-active"
                }`}
              >
                Editorial
              </div>
              <div
                onClick={handlePOChange}
                className={`col text-center ${
                  problemOption === "Submissions" && "problem-option-active"
                }`}
              >
                Submissions
              </div>
            </div>
            {problemOption === "Editorial" && (
              <ProblemEditorial problem={problem} />
            )}
            {problemOption === "Description" && (
              <ProblemDescription problem={problem} />
            )}
            {problemOption === "Submissions" && (
              <ProblemSubmissions problem={problem} user={user}/>
            )}
          </div>
          <div className="col-6">
            <Editor
              qid={qid}
              user={user}
              solutionState={solutionState}
              setSolutionState={setSolutionState}
            />
          </div>
        </div>
      </div>
    )
  );
  function handlePOChange(e) {
    setProblemOption(e.target.textContent);
  }
  async function handleGetProblem() {
    const response = await Services.getProblem(qid);
    setProblem(response.data);
  }
}

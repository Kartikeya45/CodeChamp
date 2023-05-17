import React from "react";

export default function ProblemDescription({ problem }) {
  return (
    <div className="bgwhite problem-left px-2">
      <div className="title fs-5 pt-3">
        {problem.Qid + ". " + problem.title}
      </div>

      <div className="question mt-4">
        {/* <pre>{problem.description}</pre> */}
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {problem.description}
        </pre>
        Sample Input
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {problem.test_input}
        </pre>
        Sample Output
        <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
          {problem.test_output}
        </pre>
      </div>
    </div>
  );
}

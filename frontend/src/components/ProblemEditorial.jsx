import React from "react";

export default function ProblemEditorial({ problem }) {
  // console.log(problem.solution);
  // const solution = problem && problem.solution.replace(/\t/g, '&#9;');

  return (
    <div className="bgwhite problem-left px-2 pt-3">
      <pre className="question mt-4">{problem && problem.solution}</pre>
    </div>
  );
}

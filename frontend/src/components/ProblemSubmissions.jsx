import React, { useState, useEffect } from "react";
import CodeChampServices from "../services/CodeChampServices";
export default function ProblemSubmissions({ problem, user }) {
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    getSubmissions();
  }, []);
  const submissionsMapped =
    submissions &&
    submissions.map((sub, idx) => {
      const date = new Date(sub.submitted_at);
      const formattedDate = date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      return (
        <tr key={idx} onClick={()=>alert(sub.code)}>
          <td>{formattedDate}</td>
          <td>{sub.status}</td>
        </tr>
      );
    });

  return (
    <div className="bgwhite problem-left px-2 pt-3">
      <table className="table">
        <tbody>{submissionsMapped}</tbody>
      </table>
    </div>
  );
  async function getSubmissions() {
    const response = await CodeChampServices.getSubmissions(problem.Qid, user);
    setSubmissions(response.data);
  }
}

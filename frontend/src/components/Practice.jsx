import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Services from "../services/CodeChampServices";

//list all problems

export default function Practice() {
  const navigate = useNavigate();
  const [problemsList, setproblemsList] = useState([]);
  useEffect(() => {
    getProblems();
  }, []);

  const problems =
    problemsList &&
    problemsList.map((item, idx) => {
      return (
        <tr key={idx} onClick={() => navigate(`/problem/${item.Qid}`)}>
          <td>{item.Qid}</td>
          <td>{item.title}</td>
          <td>{item.difficulty}</td>
        </tr>
      );
    });

  return (
    <div className="container mt-4">
      <table className="table table-hover ">
        <thead>
          <tr>
            <th>Qid</th>
            <th>Title</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>{problems}</tbody>
      </table>
    </div>
  );

  async function getProblems() {
    const response = await Services.getProblemsList();
    // console.log("response", response.data);
    setproblemsList(response.data);
  }
}

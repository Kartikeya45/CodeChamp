import React from "react";

export default function OutputWindow({ solutionState, loading }) {
  return (
    <div className="bgwhite output-console">
      <div className="output-window-opw fs-5 bgwhite mx-3 py-2">
        Output Window -{" "}
        {loading ? (
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          solutionState.state
        )}
      </div>
      <div className="mx-3 my-2">
        <pre>{solutionState.output}</pre>
      </div>
    </div>
  );
}

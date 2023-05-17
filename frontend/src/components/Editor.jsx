import React, { useState } from "react";
import OutputWindow from "./OutputWindow";
import CodeChampServices from "../services/CodeChampServices";

export default function Editor({ qid, user, solutionState, setSolutionState }) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("Python3");
  const [loading, setLoading] = useState(false);
  const languageList = ["Python3", "Java", "C", "C++"].map((item) => {
    return (
      <li key={item}>
        <button
          className="dropdown-item"
          onClick={() => handleLanguageChange(item)}
        >
          {item}
        </button>
      </li>
    );
  });

  return (
    <div className="editor me-1">
      <div className="editor-options d-flex align-items-center justify-content-between">
        <div className="dropdown my-1 editor-language">
          <button
            className="btn btn-secondary dropdown-toggle d-flex align-items-center justify-content-between"
            type="button"
            data-bs-toggle="dropdown"
          >
            {language}
          </button>
          <ul className="dropdown-menu">{languageList}</ul>
        </div>
        <div>
          <button className="btn btn-secondary">
            <img
              className="reset-btn"
              src="/arrow-counterclockwise.svg"
              alt="Bootstrap Reboot SVG"
              onClick={handleReset}
            />
          </button>
          <button className="btn btn-secondary ms-2">
            <img
              className="reset-btn"
              src="/clipboard.svg"
              alt="Bootstrap Clipboard SVG"
              onClick={handleCopy}
            />
          </button>
        </div>
      </div>
      <div className="codearea">
        <textarea
          className="editor-textarea "
          value={code}
          onChange={handleCodeChange}
          onKeyDown={(event) => {
            if (event.key === "Tab") {
              handleTabPress(event);
            }
          }}
        />
      </div>
      <button onClick={handleCodeRun} className="btn btn-secondary my-1">
        Run Code
      </button>

      <OutputWindow
        solutionState={solutionState}
        setSolutionState={setSolutionState}
        loading={loading}
      />
    </div>
  );

  function handleCodeChange(e) {
    setCode(e.target.value);
  }
  function handleTabPress(event) {
    event.preventDefault();
    const newCode = code + "\t";
    setCode(newCode);
  }
  function handleLanguageChange(lang) {
    setLanguage(lang);
  }
  function handleReset() {
    setCode("");
  }
  function handleCopy() {
    navigator.clipboard.writeText(code);
  }
  function handleLanguageChange(e) {
    setLanguage(e.target.value);
  }
  async function handleCodeRun() {
    const response = await CodeChampServices.postSubmission(
      { code, user },
      qid
    );
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSolutionState({
        state: response.data.status,
        output: response.data.user_output,
      });
    }, 2000);
    //TIMER FOR 3 seconds
    // setLoading(false)
    // setSolutionState({
    //   state: response.data.status,
    //   output: response.data.user_output,
    // });
  }
}

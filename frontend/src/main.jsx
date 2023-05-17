import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { PythonProvider } from "react-py";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PythonProvider>
        <App />
      </PythonProvider>
    </BrowserRouter>
  </React.StrictMode>
);

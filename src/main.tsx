import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import App from "./App";
import "./index.css";
// import "bootstrap/dist/css/bootstrap.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Loading from "./Loading/Loading";

const t0 = performance.now();

function renderCallback(e) {
  console.log("Rendering done", e);
  const t1 = performance.now();

  console.log(`Mount took ~${(t1 - t0) / 1000} seconds.`);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

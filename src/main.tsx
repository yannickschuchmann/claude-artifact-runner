import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import App from "./App.tsx";
import "./index.css";

const getBasePath = () => {
  if (import.meta.env.PROD) {
    // Extract repository name from the URL
    const repoName = window.location.pathname.split('/')[1];
    return `/${repoName}`;
  }
  return '/';
};

const base = getBasePath();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router base={base} hook={useHashLocation}>
      <App />
    </Router>
  </React.StrictMode>
);

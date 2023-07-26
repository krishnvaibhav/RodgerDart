import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/styles/style.css";
import { StateProvider } from "./context/stateProvider";
import reducer, { initialState } from "./context/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <App />
    </StateProvider>
  </React.StrictMode>
);

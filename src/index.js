import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/styles/style.css";
import { StateProvider } from "./context/stateProvider";
import reducer, { initialState } from "./context/reducer";
import HomeScreen from "./components/HomeScreen";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider reducer={reducer} initialState={initialState}>
      <HomeScreen />
    </StateProvider>
  </React.StrictMode>
);

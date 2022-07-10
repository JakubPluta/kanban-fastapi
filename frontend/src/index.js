/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import Board from "./components/Board";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  return (
    <div>
      <Board />
    </div>
  );
};

root.render(<App />);

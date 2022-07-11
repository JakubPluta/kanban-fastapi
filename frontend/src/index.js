/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import Board from "./components/Board";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import { useState } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
};

const App = () => {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTc1NDAzMzksImlhdCI6MTY1NzUzODUzOSwic2NvcGUiOiJhY2Nlc3NfdG9rZW4iLCJzdWIiOiIxIn0.izbjTLHHYv2fcVGYMdwuxUZ1TEGcNhqu6SU3uTTJvQU"
  ); //useState(() => getToken());
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Board token={token} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

root.render(<App />);

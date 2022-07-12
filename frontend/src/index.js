/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import Board from "./components/Board";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));

const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
};

const App = () => {
  const [token, setToken] = useState(() => getToken());
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            !token ? <Login setToken={setToken} /> : <Board token={token} />
          }
        ></Route>
        <Route path="/login" element={<Login setToken={setToken} />}></Route>
        <Route
          path="/register"
          element={<Register setToken={setToken} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

root.render(<App />);

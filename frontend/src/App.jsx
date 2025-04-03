import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Left from "./home/leftpart/Left";
import Right from "./home/Rightpart/Right";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { useAuth } from "./context/AuthProvider";

function App() {
  const[authUser, setAuthUser]=useAuth(); 
  
  return (
    <Routes>
      {/* Protected Home Route */}
      <Route
        path="/"
        element={
          authUser ? (
            <div className="flex h-screen">
              <Left />
              <Right />
            </div>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Login Route */}
      <Route
        path="/login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />

      {/* Signup Route */}
      <Route
        path="/signup"
        element={authUser ? <Navigate to="/" /> : <Signup />}
      />
    </Routes>
  );
}

export default App;

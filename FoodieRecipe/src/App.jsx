import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/firstPage";
import Dashboard from "./components/dashboard";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

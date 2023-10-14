import React from "react";
import "./App.css";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
            <Route path='/signin' element={<Login theme='Light'/>}/> 
          </Routes>
      </div>
  </Router>
  );
}

export default App;

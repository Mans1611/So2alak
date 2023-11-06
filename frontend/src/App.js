import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Login from "./pages/login/Login";
import { createContext, useState } from "react";

export const AppState = createContext(null); // I export it to be accessable in the whole components
function App() {
  const [dark, setDark] = useState(false);

  return (
    <Router>
      <div className="App">
        <AppState.Provider value={{ dark, setDark }}>
          {" "}
          {/* in the value i put all the state and handlers which i would like to share in the app */}
          <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/welcome" element={<WelcomePage />} />
          </Routes>
        </AppState.Provider>
      </div>
    </Router>
  );
}

export default App;

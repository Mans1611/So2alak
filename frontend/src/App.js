import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Login from "./pages/login/Login";
import Loading from "./pages/Loading/Loading";
import NotFound from "./pages/NotFound/NotFound";

import { createContext, useState } from "react";
import SignUP from "./pages/SignUp/SignUP";
import Landing from "./pages/LandingPage/Landing";

export const AppState = createContext(null); // I export it to be accessable in the whole components
function App() {
  const [dark, setDark] = useState(false);
  const [studentCourses, setStuCourses] = useState([]);
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");

  return (
    <Router>
      <div className="App">
        <AppState.Provider
          value={{
            dark,
            setDark,
            studentCourses,
            setStuCourses,
            username,
            setUsername,
            id,
            setId,
          }}
        >
          {" "}
          {/* in the value i put all the state and handlers which i would like to share in the app */}
          <Routes>
            {
              // home page => path="/" or path="/home"
              /*
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              */
            }
            <Route path="/signin" element={<Login />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/signup" element={<SignUP />} />
            {
              // temp.
            }
            <Route path="/loading" element={<Loading />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppState.Provider>
      </div>
    </Router>
  );
}

export default App;

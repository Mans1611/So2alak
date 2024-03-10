import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Login from "./pages/login/Login";
import Loading from "./pages/Loading/Loading";
import NotFound from "./pages/NotFound/NotFound";

import { createContext, useState } from "react";
import SignUP from "./pages/SignUp/SignUP";
import MainPage from "./pages/MainPage/MainPage";
import HeartComponent from "./components/HeartComponent/HeartComponent";
import FeedPage from "./pages/FeedPage/FeedPage";
import About from "./pages/About/About";
import Profile from './pages/Profile/Profile';

export const AppState = createContext(null); // I export it to be accessable in the whole components
function App() {
  const [dark, setDark] = useState(true);
  const [studentCourses, setStuCourses] = useState([]);
  const [username, setUsername] = useState("");
  const [id, setId] = useState("aaaa");

  return (
    <Router>
      <div className="App">
        <AppState.Provider
          value={{
            dark,setDark,
            studentCourses,setStuCourses,
            username,setUsername,
            id,setId,
          }}
        >
         
          {/* in the value i put all the state and handlers which i would like to share in the app */}
          <Routes>
            
            <Route path="/signin" element={<Login />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/signup" element={<SignUP />} />
            
            {/*Nesting Routes*/}
            <Route path="/main" element={<MainPage/>}>
              <Route path="profile" element={<Profile />} />
            
              {/* <Route path="myquestions" element={<><div>Mansoure</div></>} /> */}
              <Route path="feedpage" element={<FeedPage/>} />
              <Route path="list" element={<div style={{paddingLeft:"250px"}}>list </div>}/>
            
              
            </Route>
            <Route path="/loading" element={<Loading />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppState.Provider>
      </div>
    </Router>
  );
}

export default App;

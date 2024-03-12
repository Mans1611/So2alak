import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Login from "./pages/login/Login";
import Loading from "./pages/Loading/Loading";
import NotFound from "./pages/NotFound/NotFound";

import { createContext, useState } from "react";
import SignUP from "./pages/SignUp/SignUP";
import MainPage from "./pages/MainPage/MainPage";
import FeedPage from "./pages/FeedPage/FeedPage";
import About from "./pages/About/About";
import Profile from './pages/Profile/Profile';
import TeacherProfile from "./pages/TeacherProfile/TeacherProfile";
import Landing from "./pages/LandingPage/Landing";
import { QueryClient, QueryClientProvider} from 'react-query'
export const AppState = createContext(null); // I export it to be accessable in the whole components
const queryClient = new QueryClient();


function App() {
  const [dark, setDark] = useState(false);
  const [studentCourses, setStuCourses] = useState([]);
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [sidebarSelected,setSideBarSelected] = useState('general');

  return (
    <Router>
      <div className="App">
      <QueryClientProvider client={queryClient}>
        <AppState.Provider
          value={{
            dark,setDark,
            studentCourses,setStuCourses,
            username,setUsername,
            id,setId,
            sidebarSelected,setSideBarSelected
          }}
        >
          {/* in the value i put all the state and handlers which i would like to share in the app */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/signup" element={<SignUP />} />
            <Route path="/teacherprofile" element={<TeacherProfile />} />
            
            {/*Nesting Routes*/}
            <Route path="/main" element={<MainPage/>}>
              <Route path="profile" element={<Profile />} />
              <Route path="feedpage" element={<FeedPage/>} />
            <Route path="course" element={<div style={{paddingLeft:"250px"}}> </div>}/>
              <Route path="list" element={<div style={{paddingLeft:"250px"}}>list </div>}/>
            </Route>
            
            <Route path="/loading" element={<Loading />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppState.Provider>
        </QueryClientProvider>
      </div>
    </Router>
  );
}

export default App;

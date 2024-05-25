import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import Login from "./pages/login/Login";
import Loading from "./pages/Loading/Loading";
import NotFound from "./pages/NotFound/NotFound";

import { createContext, useEffect, useRef, useState } from "react";
import SignUP from "./pages/SignUp/SignUP";
import MainPage from "./pages/MainPage/MainPage";
import FeedPage from "./pages/FeedPage/FeedPage";
import About from "./pages/About/About";
import Profile from './pages/Profile/Profile';
import TeacherProfile from "./pages/TeacherProfile/TeacherProfile";
import Landing from "./pages/LandingPage/Landing";
import { QueryClient, QueryClientProvider} from 'react-query'
import Course from "./pages/Course/Course";
import FullQuestion from "./pages/FullQuestion/FullQuestion";
import ListsPage from "./pages/Lists/ListsPage";
import LeaderBoard from "./pages/LeaderBoard/LeaderBoard";
import ListPage from "./pages/ListPage/ListPage";
export const AppState = createContext(null); // I export it to be accessable in the whole components

const queryClient = new QueryClient();


function App() {
  const [dark, setDark] = useState(false);
  const [user_courses, setUserCourses] = useState([]);
  const [stundetInfo,setStudentInfo] = useState(null); 
  const [sidebarSelected,setSideBarSelected] = useState(null);
  const [auth,setAuth]=useState(false);
  const [showNotification,setShowNotification] = useState(false);
  const [isTeacher,setIsTeacher] = useState(false);


  
  return (
    <Router>
      <div className="App">
      <QueryClientProvider client={queryClient}>
        <AppState.Provider
          value={{
            dark,setDark,
            auth,setAuth,
            stundetInfo,setStudentInfo,
            user_courses, setUserCourses,
            sidebarSelected,setSideBarSelected,
            showNotification,setShowNotification,
            isTeacher,setIsTeacher
          }}
        >
          {/* in the value i put all the state and handlers which i would like to share in the app */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/signup" element={<SignUP />} />
            {/*Nesting Routes*/}
            <Route path="/main" element={<MainPage/>}>
              <Route path="teacherprofile/:teacher_id" element={<TeacherProfile />} />
              <Route path="feedpage" element={<FeedPage/>} />
              <Route path="leaderboard" element={<LeaderBoard/>} />
              <Route path="profile/:user_id" element={<Profile />} />
              <Route path=":course_code" element={<Course/>} />
              <Route path="question/:question_id" element={<FullQuestion/>} />
              <Route path="lists/:student_id" element={<ListsPage/>}/>
              <Route path="lists/:student_id/list/:list_id" element={<ListPage/>}/>
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

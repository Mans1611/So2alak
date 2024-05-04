import React, { useContext, useEffect, useRef, useState } from "react";
import "./welcomepage.scss";
import SimpleNavBar from "../../components/SimpleNavBar/SimpleNavBar";
import wave from "../../assets/wave.png";
import CourseCard, {
  DefaultCourse,
  LoadingCard,
} from "../../components/CourseToFollow/CourseCard";
import { AppState } from "../../App";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios'
import {debounce} from 'lodash';
import { useCourseRegister } from "../../hooks/useCourseRegister";

const WelcomePage = () => {
  document.title = "Welcome";
  const navigate = useNavigate();
  const {
    dark,
    isTeacher,
    stundetInfo,setStudentInfo,
    studentCourses,setStuCourses,
    id: student_id,
  } = useContext(AppState);

  const [searchedCourses, setSearchedCourses] = useState([]);
  const search = useRef(""); // here i used useRef, as i don't want the comp to be updated when the input changes. 
  const [Lodaing, setLoading] = useState(false);


  const debouncedFunction = debounce(async()=>{
      console.log("invoked")
      if (search.current.trim() === "") return setLoading(false);
      try{
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/course/searchcourse/${search.current}`
          );  
        setSearchedCourses(data.courses);
      }catch(err){
        console.log(err);
      }
      setLoading(false);
  },500);
  
  const searchForCourse = (e) => {
    /*
            1 - Check if string is empty. (Done)
            2 - multiple requests will be sent if the function is invoked onChange.(Done)
            3 - check if the request returned with an empty array. 
        */
    
    setLoading(true);
    // if the value in search for courses is empty it will not send a request.
    search.current  = e.target.value;
    debouncedFunction()
    
   
  };

  const RegisterCourses = () => {
    useCourseRegister(stundetInfo,studentCourses);
  };
  useEffect(()=>{
    if(studentCourses.length == 0 ){
      let subscrbe = true
      const fetchCourses = async()=>{
        const {data} = await axios.put(`${process.env.REACT_APP_API_URL}/person/defualtCourses`,{
          level: stundetInfo?.student_level,
          department:stundetInfo?.student_department,
          sub_department: stundetInfo?.student_subdepartment
        })
        setStuCourses(data)
      }
      fetchCourses()

    }
  },[])
  return (
    <div className={`welcome-page ${dark ? "dark" : ""}`}>
      <SimpleNavBar />
      <h1 className="welcome-sentance">
        Welcome <span>{ isTeacher? 'Dr' + stundetInfo?.username?.split(" ")[0] :  stundetInfo?.username?.split(" ")[0]},</span>
      </h1>
      <div className="search-wrapper">
        <input
          onChange={searchForCourse}
          placeholder="Search for a course"
          type="text"
        />
      </div>
      <img className="wave" src={wave} alt="wave" />

      <div
        style={{ visibility: `${search.current.trim() === "" ? "hidden" : "visible"}` }}
        className={`course-card-container ${
          searchedCourses.length === 0 ? "no-scroll" : ""
        }`}
      >
        {Lodaing ? (
          <LoadingCard />
        ) : searchedCourses.length === 0 ? (
          <div className="not-found">This Course is Not Exist</div>
        ) : (
          searchedCourses?.map((course, id) => (
            <CourseCard
              key={id}
              course={course}
              setStuCourses={setStuCourses}
            />
          ))
        )}
      </div>
      <div className="default-courses-container">
        <h2 className="default-courses-title">Your courses</h2>

        <div
          className={`grid-courses ${
            studentCourses.length === 0 ? "no-grid" : ""
          }`}
        >
          {studentCourses.length === 0 ? (
            <div className="not-found">You have no courses yet.</div>
          ) : (
            studentCourses?.map((course, id) => (
              <DefaultCourse
                key={id}
                setStuCourses={setStuCourses}
                course={course}
              />
            ))
          )}
        </div>
      </div>
      <div className="next-wrapper">
        <button onClick={RegisterCourses} className="next-btn">
          Next
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;

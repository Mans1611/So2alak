// 'useState' is defined but never used
// import React, { useContext, useState } from "react";
import React, { useContext } from "react";
import "./coursecard.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { AppState } from "../../App";

const CourseCard = ({ course }) => {
  const { dark, studentCourses, setStuCourses } = useContext(AppState);

  const addCourse = () => {
    if (studentCourses.some((Course) => Course.course_id === course.course_id))
      return;
    setStuCourses((courses) => [...courses, course]);
  };
  let img = null;
  if (course.course_logo){
    img = `data:${course.mimtype};base64,${course.data}`
  }
    
  return (
    <div className={`course-card ${dark ? "dark" : ""}`}>
      <div className="course-details">
        
        <h2 className="course-name">{course?.course_name}</h2>
        <h5 className="course-code">{course?.course_id}</h5>
      </div>
      <button onClick={addCourse} className="folw-btn">
        Follow
      </button>
    </div>
  );
};

export const LoadingCard = () => {
  const { dark } = useContext(AppState);
  return (
    <>
      <div className={`course-card loading ${dark ? "dark" : ""}`}>
        <div className="course-details">
          <h2 className="course-name"></h2>
          <h5 className="course-code"></h5>
        </div>
      </div>
      <div className={`course-card loading ${dark ? "dark" : ""}`}>
        <div className="course-details">
          <h2 className="course-name"></h2>
          <h5 className="course-code"></h5>
        </div>
      </div>
    </>
  );
};

export const DefaultCourse = ({ course, setStuCourses }) => {
  let img = null;
  if (course.course_logo){
    img = `data:${course.mimtype};base64,${course.data}`
  }
  return (
    <div className="default course-card">
      <div className="course-details">
      { course.course_logo && 
      <div className="course-logo-wrapper">
        <img className="course_logo" src={img} alt={course.course_name} srcset="" />
      </div>
      }
        <h2 className="course-name">{course?.course_name}</h2>
        <h5 className="course-code">{course?.course_id}</h5>
      </div>
      <button
        onClick={() =>
          setStuCourses((courses) =>
            courses.filter((Course) => Course.course_id !== course.course_id)
          )
        }
        className="folw-btn followed-btn"
      >
        Followed
        <CheckCircleOutlineIcon style={{ marginLeft: "5px" }} />
      </button>
    </div>
  );
};

export default CourseCard;

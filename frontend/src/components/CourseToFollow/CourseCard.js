import React, { useState } from "react";
import "./coursecard.scss";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const CourseCard = ({ course, followedCourses, setFollowedCourses }) => {
  return (
    <div className="course-card">
      <div className="course-details">
        <h2 className='course-name'>{course?.course_name}</h2>
        <h5 className='course-code'>{course?.course_id}</h5>
      </div>
      <button
        onClick={() => setFollowedCourses((courses) => [...courses, course])}
        className="folw-btn"
      >
        Follow
      </button>
    </div>
  );
};

export const DefaultCourse = ({course,setFollowedCourses})=>{
  return(
    <div className='default course-card'>
      <div className="course-details">
        <h2 className='course-name'>{course?.course_name}</h2>
        <h5 className='course-code'>{course?.course_id}</h5>
      </div>
        <button onClick={()=>setFollowedCourses(courses=>courses.filter(Course=>Course.courseCode!==course.courseCode))} className='folw-btn followed-btn'>
          Followed
          <CheckCircleOutlineIcon style={{marginLeft:'5px'}}/>
        </button>
    </div>
  )
}

export default CourseCard;

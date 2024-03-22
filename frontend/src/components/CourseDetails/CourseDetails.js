import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import avatar from '../../assets/avatar.png' 
import './course_details.scss'
import { AppState } from '../../App'
import { useParams } from 'react-router-dom'

const CourseDetails = ({setTop}) => {
  const {studentCourses} = useContext(AppState);
  
  const {course_code} = useParams();
  const selectedOne = studentCourses.filter(course=>course.course_id.toLowerCase() === course_code)[0]
  const course_details = useRef(null);

  useLayoutEffect(()=>{
    setTop(course_details.current.offsetHeight);
  },[])

  return (
    <div ref={course_details} className='third_part_child'>
        <div className="header">
            <h2>Course Details</h2>
            <div className="flex">
                <div className="courselogo">
                    <img src={avatar} alt="" srcset="" />
                  <h1 className='title'>{selectedOne?.course_name}</h1>
                </div>
                <h2 className='title code'>#{selectedOne?.course_id}</h2>
            </div>
        </div>
        <h3 className='instructors-title'>Instructors:</h3>
        <h3>Dr: Mansour Mohamed</h3>
        <h3>Dr: Hanafe Al Doa</h3>
    </div>
  )
}

export default CourseDetails
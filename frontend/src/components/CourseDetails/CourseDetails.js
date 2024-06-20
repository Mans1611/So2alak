import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import course from '../../assets/course.png' 
import './course_details.scss'
import { AppState } from '../../App'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import TopStudents from '../TopStudents/TopStudents'

const CourseDetails = ({setTop}) => {

  const {user_courses,setUserCourses,stundetInfo} = useContext(AppState);
  const {course_code} = useParams();
  const course_details_div = useRef(null);
  const [courseDetails,setCourseDetails] = useState({});
  
  // this variable to give me if the course is register for the student or not.

  let isRegistered = user_courses.some(course=>course.course_id === course_code)

  useEffect(()=>{
    const FetchCourseDetails = async()=>{
      const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/course/course_details/${course_code?.toUpperCase()}`);
      setCourseDetails(data)
      document.title = data.course_name;
    }
    FetchCourseDetails()
  },[course_code])


  useLayoutEffect(()=>{
    setTop(course_details_div.current.offsetHeight);
  },[]);

  const handleRegister = async ()=>{
    // here we have to check of the courses is more than 8 or 7 for one students.
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/person/registercourse`,{
      username:stundetInfo.username,
      student_id:stundetInfo.student_id,
      user_courses:[{course_id:course_code?course_code.toUpperCase():courseDetails.course_id?.toUpperCase()}]
    })
    if (res.status === 201){ // this means the the studet register and now i will add it to the sidebar
      isRegistered = true
      setUserCourses(courses=>[...courses,res.data.course])
    }
  }
  return (
    <div ref={course_details_div} className='third_part_child'>
        <div className="header">
            <h2>Course Details</h2>
            {!isRegistered && 
            <div className="button-wrapper">
              <button onClick ={handleRegister} className='register'>Register This Course</button>
            </div>
              }
            <div className="flex">
                <div className="courselogo">
                    <img src={courseDetails.img_url ? courseDetails.img_url:course} alt="" srcSet="" />
                  <h1 className='title'>{courseDetails?.course_name}</h1>
                </div>
                <h2 className='title code'>#{courseDetails?.course_id}</h2>
            </div>
        </div>
        <h3 className='instructors-title'>Instructors:</h3>
        {courseDetails?.teachers?.map((teacher,key)=>
          <Link key={key}>
            <h3 className='teacher' >{teacher?.teacher_name}</h3>
          </Link>
        )}
        {
          courseDetails.top3?.length > 0 &&
        <TopStudents
        title={'Top 3 Studnets'}
        properties = {['Name','points']}
        values = {courseDetails.top3?.map(top=>[top.username.slice(0,10),top.points])}
        />
      }
    </div>
  )
}

export default CourseDetails
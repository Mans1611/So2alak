import React, { useContext, useState } from 'react'
import './coursestabs.scss'
import { AppState } from '../../App'
const CoursesTabs = () => {
  const {stundetInfo,studentCourses}= useContext(AppState);
  const [active,setActive] = useState('general')
    return (
        <div className='courses_tabs'>
            <div className={`tab ${active==='general'? 'active':''}`}>
                General
            </div>
            {
                studentCourses.map((course,key)=>(
                    <div onClick={()=>setActive(course.course_name)} key={key} className={`tab ${active===course.course_name?'active':''}`}>
                        {course.course_name}
                    </div>
                ))
            }
        </div>
  )
}

export default CoursesTabs
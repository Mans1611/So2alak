import React from 'react'
import './coursecard.scss'
const CourseCard = () => {
  return (
    <div className='course-card'>
      <div className="course-details">
        <h2 className='course-name'>Course Name</h2>
        <h5 className='course-code'>course code</h5>
      </div>
      <button className='folw-btn'>Follow</button>
    </div>
  )
}

export default CourseCard
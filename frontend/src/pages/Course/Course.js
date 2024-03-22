import React from 'react'
import { useParams } from 'react-router-dom'
import HeartComponent from '../../components/HeartComponent/HeartComponent';
import ThirdPart from '../../components/ThirdPart/ThirdPart';

const Course = () => {
    const {course_code} = useParams();
  return (
    <div className='feedpage' style={{paddingLeft:"250px"}}>
        <HeartComponent/>
        <ThirdPart/>
    </div>
  )
}

export default Course
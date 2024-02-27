import React, { useContext, useEffect, useState } from 'react'
import './sidebar.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { AppState } from '../../App';

const SideBar = () => {
  const [loading,setLoading]=useState(true);
  const {dark} = useContext(AppState);
  const [courses,setCourses] = useState([]);


  useEffect(()=>{
    const fetchCourses = async ()=>{
      const result = await axios.get('http://localhost:8000/person/getStudentCourses/Ahmed')
      setCourses(result.data.data)
      setLoading(false);
    }
    fetchCourses();
  },[]);
  return (
    <div className={`sidebar ${dark && 'dark'} `}>
      <div className="sidebar-logo">
      <i className="fi fi-sr-home"></i>
      </div>
      <hr/>
        <div className="side-bar-items">
          <h2 className='title'>You</h2>
          <ul className='list'>
            <li className='items'>
              <Link className='flex' to={'/main/list'}>
              <i className="fi fi-sr-home"></i>
                My List
                </Link>
              </li>
            <li className='items'>
              <Link className='flex' to={'/course/myquestions'}>
              <i class="fi fi-sr-messages-question"></i>
                My Questions
                </Link>
              </li>
            <li className='items'>
              <Link className='flex' to={'/course/myanswers'}>
                <i className="fi fi-sr-answer"></i>
                My Answers
                </Link>
            </li>
        
          </ul>
      </div>
      <hr/>
        <div className="side-bar-items">
            <h2 className='title'>Your Courses</h2>
            <ul className='list'>
      {
        loading? 
          <LoadingCourses/>
          :
          <>
             {courses.map((course,index)=>
              <li key={index} className='items'><Link to={`/course/${course.course_name.replace(" ","")}`}>{course.course_name}</Link></li>
             )}
          </>
            }
            </ul>
        </div>
    </div>
  )
}

const LoadingCourses = ()=>
  (
        <>
          <div className="loading-card"></div>
          <div className="loading-card"></div>
          <div className="loading-card"></div>              
        </>
  )


export default SideBar;

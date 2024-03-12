import React, { useContext, useEffect, useState } from 'react'
import './sidebar.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { AppState } from '../../App';

const SideBar = () => {
  const [loading,setLoading]=useState(true);
  const {dark,
    sidebarSelected,setSideBarSelected,
    username,
    studentCourses,setStuCourses} = useContext(AppState);
  


  useEffect(()=>{
    const fetchCourses = async ()=>{
      const result = await axios.get(`http://localhost:8000/person/getStudentCourses/${username?username:'Ahmed'}`)
      setStuCourses(result.data.data)
      setLoading(false);
    }
    fetchCourses();
  },[]);

  const handleActive=(selected)=>{
      setSideBarSelected(selected)
  }
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
              <i className="fi fi-sr-home"></i>
                My List
              </li>
            <li className='items'>
              <i class="fi fi-sr-messages-question"></i>
                My Questions
              </li>
            <li className='items'>
              
                <i className="fi fi-sr-answer"></i>
                My Answers
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
             {studentCourses.map((course,index)=>
              <li key={index} onClick={()=>handleActive(course.course_name)} className={`items ${sidebarSelected === course.course_name?'active':''}`}>{course.course_name}</li>
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

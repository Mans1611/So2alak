import React, { useState } from 'react'
import './welcomepage.scss'
import SimpleNavBar from '../../components/SimpleNavBar/SimpleNavBar'
import wave from '../../assets/wave.png';
import CourseCard from '../../components/CourseToFollow/CourseCard';
const WelcomePage = () => {
    document.title = "Welcome";
    const [dark,setDark] = useState(true);
    const [username,setUsername]=useState('Manosur');

  return (
    <div className={`welcome-page ${dark?'dark':''}`}>
        <SimpleNavBar setDark={setDark}/>
        <h1 className='welcome-sentance'>
            Welcome <span>{username.split(" ")[0]},</span>
        </h1>
        <div className="search-wrapper">
            <input placeholder='Search for a course' type='text'/>
        </div>
        <img className='wave' src={wave} alt="wave"/>
        <div className="course-card-container">
            <CourseCard/>
        </div>
        
    </div>
  )
}

export default WelcomePage
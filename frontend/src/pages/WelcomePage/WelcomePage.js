import React, { useState } from 'react'
import './welcomepage.scss'
import SimpleNavBar from '../../components/SimpleNavBar/SimpleNavBar'
import wave from '../../assets/wave.png';
import CourseCard, { DefaultCourse } from '../../components/CourseToFollow/CourseCard';
import { defaultCourses} from '../../fakedata/FakeCourses';

const WelcomePage = () => {
    document.title = "Welcome";
    const [dark,setDark] = useState(true);
    const [username,setUsername]=useState('Manosur');
    const [followedCourses,setFollowedCourses]=useState(defaultCourses);

    return (
    <div className={`welcome-page ${dark?'dark':''}`}>
        <SimpleNavBar dark={dark} setDark={setDark}/>
        <h1 className='welcome-sentance'>
            Welcome <span>{username.split(" ")[0]},</span>
        </h1>
        <div className="search-wrapper">
            <input placeholder='Search for a course' type='text'/>
        </div>
        <img className='wave' src={wave} alt="wave"/>
        <div className="course-card-container">
            {defaultCourses?.map((course,id)=>
                <CourseCard key={id} course={course} followedCourses={followedCourses} setFollowedCourses={setFollowedCourses}/>
                )}
        </div>
        <div className="course-card-container default-courses">
            <h2 className='default-courses-title'>Your courses</h2>
            {
                followedCourses?.map((course,id)=> <DefaultCourse key={id} setFollowedCourses={setFollowedCourses} 
                    course={course}/>)
            }
        </div>
        
    </div>
  )
}

export default WelcomePage
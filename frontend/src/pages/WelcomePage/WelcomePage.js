import React, { useContext, useState } from 'react'
import './welcomepage.scss'
import SimpleNavBar from '../../components/SimpleNavBar/SimpleNavBar'
import wave from '../../assets/wave.png';
import CourseCard, { DefaultCourse } from '../../components/CourseToFollow/CourseCard';
import { defaultCourses} from '../../fakedata/FakeCourses';
import { AppState } from '../../App';
import axios from 'axios';

const WelcomePage = () => {
    document.title = "Welcome";
    const {dark} = useContext(AppState);
    const [username,setUsername]=useState('Manosur');
    const [followedCourses,setFollowedCourses]=useState(defaultCourses);
    const [searchedCourses,setSearchedCourses]=useState([]);
    const [search,setSearch] = useState(null);
    
    const searchForCourse = async(e)=>{
        /*
            1 - Check if string is empty. (Done)
            2 - multiple requests will be sent if the function is invoked onChange.
            3 - check if the request returned with an empty array. 
        */
        // if the value in search for courses is empty it will not send a request.
        if(e.target.value.trim() === '') return ;

        const {data} = await axios.get(`http://localhost:8000/post/searchcourse/${e.target.value}`)   
        setSearchedCourses(data.courses);

    }
    
    return (
    <div className={`welcome-page ${dark?'dark':''}`}>
        <SimpleNavBar/>
        <h1 className='welcome-sentance'>
            Welcome <span>{username.split(" ")[0]},</span>
        </h1>
        <div className="search-wrapper">
            <input onChange={(e)=>searchForCourse(e)} placeholder='Search for a course' type='text'/>
        </div>
        <img className='wave' src={wave} alt="wave"/>
        <div className="course-card-container">
            {searchedCourses?.map((course,id)=>
                <CourseCard key={id} course={course} followedCourses={followedCourses} setFollowedCourses={setFollowedCourses}/>
                )}
        </div>
        <div className="default-courses-container">
            <h2 className='default-courses-title'>Your courses</h2>
            <div className="grid-courses">
                {
                    followedCourses?.map((course,id)=> <DefaultCourse key={id} setFollowedCourses={setFollowedCourses} 
                    course={course}/>)
                }
            </div>
        </div>
        
    </div>
  )
}

export default WelcomePage
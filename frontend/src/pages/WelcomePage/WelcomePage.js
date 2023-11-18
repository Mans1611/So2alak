import React, { useContext, useState } from 'react'
import './welcomepage.scss'
import SimpleNavBar from '../../components/SimpleNavBar/SimpleNavBar'
import wave from '../../assets/wave.png';
import CourseCard, { DefaultCourse, LoadingCard } from '../../components/CourseToFollow/CourseCard';
import { AppState } from '../../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    document.title = "Welcome";
    const navigate = useNavigate()
    const {dark,
        username,
        studentCourses,setStuCourses,
        id:student_id
        } = useContext(AppState);
       
    const [searchedCourses,setSearchedCourses]=useState([]);
    const [search,setSearch] = useState('');
    const [Lodaing,setLoading] = useState(false);
    const searchForCourse = async(e)=>{
        /*
            1 - Check if string is empty. (Done)
            2 - multiple requests will be sent if the function is invoked onChange.
            3 - check if the request returned with an empty array. 
        */
        setLoading(true);
        // if the value in search for courses is empty it will not send a request.
        if(e.target.value.trim() === '') return setLoading(false) ;
        setSearch(e.target.value);
        const {data} = await axios.get(`http://localhost:8000/post/searchcourse/${e.target.value}`)   
        const timeout = setTimeout(()=>{
            setLoading(false);
            setSearchedCourses(data.courses);
            clearTimeout(timeout)
        },750);
        
    }
    const RegisterCourses = async()=>{
        if(studentCourses.length === 0) return  // if no courses is selected no request send to backend.
        try{
            console.log(studentCourses);
            const result = await axios.post('http://localhost:8000/person/registercourse',{
                studentCourses,
                student_id
            })
            navigate('/feedpage')
        }catch(error){
            if(error.response.status === 400)
                console.log("Error")
        }
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
            
           
        <div style={{visibility:`${search.trim() == "" ? 'hidden':'visible'}`}} className={`course-card-container ${searchedCourses.length === 0 ?'no-scroll':''}`}>
            {Lodaing ? 
                <LoadingCard/>
                : 
                searchedCourses.length === 0 ? 
                    <div className='not-found'>This Course is Not Exist</div> 
                    : 
                    searchedCourses?.map((course,id)=>
                    <CourseCard key={id} course={course} setStuCourses={setStuCourses}/>
                )
            }
        </div>
        <div className="default-courses-container">
            <h2 className='default-courses-title'>Your courses</h2>
            
            <div  className={`grid-courses ${studentCourses.length === 0? 'no-grid':  ''}`}>
            {
                studentCourses.length === 0 ? <div className='not-found'>You have no courses yet.</div> :
                studentCourses?.map((course,id)=> <DefaultCourse key={id} setStuCourses={setStuCourses} 
                course={course}/>)
            }
            </div>
        </div>
        <div className="next-wrapper">
            <button onClick={RegisterCourses} className='next-btn'>Next</button>
        </div>
        
    </div>
  )
}

export default WelcomePage
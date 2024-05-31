import React, { useContext, useEffect, useState } from 'react'
import './leaderboard.scss'
import CoursesTabs from '../../components/CoursesTabs/CoursesTabs'
import StudentsStanding from '../../components/StudentsStanding/StudentsStanding';
import axios from 'axios';
import { AppState } from '../../App';
const LeaderBoard = () => {
    document.title = 'LeaderBoard';
    const [active,setActive] = useState('general')
    const [standing,setStanding]=useState([])
    const {stundetInfo,user_courses} = useContext(AppState);
    useEffect(()=>{
        const fetchLeaders = async()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/person/leaderboard?course_id=${user_courses?.find(course=>active===course.course_name)?.course_id}&level=${stundetInfo.student_level}`)
                if (res.status===200){
                    setStanding(res.data.data);
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchLeaders()
    },[active])

    return (
        <div className='leaderboard-page'>
        <CoursesTabs active ={active} setActive={setActive}/>
        <StudentsStanding user_standing={standing}/>
    </div>
  )
  
}

export default LeaderBoard
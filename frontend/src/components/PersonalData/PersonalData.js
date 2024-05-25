import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AppState } from '../../App';

const PersonalData = () => {
    const [data,setData] = useState({});
    const {stundetInfo} = useContext(AppState);    
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const result = await axios.get(`${process.env.REACT_APP_API_URL}/person/personalInfo/${stundetInfo?.username}`)
                setData(result.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[])
  return (
    <div className='score'>
        <div className='score_in'>
            <div className='achieved'><p>{stundetInfo.points?stundetInfo.points:0}</p> <p>Points</p></div>
            <div className='achieved'><p>{data.no_questions?data.no_questions:0}</p> <p>Questions</p></div>
            <div className='achieved'><p>{data.no_answers?data.no_answers:0}</p> <p>Answers</p></div>
        </div>
    </div>
  )
}

export default PersonalData
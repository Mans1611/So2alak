import React, { useContext, useEffect, useState } from 'react'

import './myanswers.scss';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AppState } from '../../App';
import LoadingQuestion from '../../components/Question/LoadingQuestion';
import Question from '../../components/Question/Question';

const MyAnswers = () => {
    const [questions,setQuestions] = useState([]);
    const [loading,setLoading]=useState(false);
    const {username} = useParams();
    const {stundetInfo} = useContext(AppState);
    
    useEffect(()=>{
        const fetchMyQuestions = async()=>{
            try{
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/person/myquestions/${username}`)
                if(res.status === 200){
                    setLoading(false);
                    setQuestions(res.data);
                }
            }catch(err){
                console.log(err)
            }
        }
        fetchMyQuestions()
    },[])

  return (
    <div className='myanswers-page'>
          <h1 className='username-title'>
            { username === stundetInfo.username ? 'My' : username+`'s`} Answers 
        </h1>
        <div className="questions-list">
          {loading ? <LoadingQuestion/> : questions.map((question,key)=><Question question={question} key={key}/>)}
        </div>
    </div>
  )
}

export default MyAnswers
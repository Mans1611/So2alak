import axios from 'axios';
import { AppState } from '../../App';
import LoadingQuestion from '../../components/Question/LoadingQuestion';
import QuestionContainer from '../../components/QuestionContainer/QuestionContainer';
import './myquestions.scss';

import React, { useContext, useEffect, useState } from 'react'
import Question from '../../components/Question/Question';
import { useParams } from 'react-router-dom';

const MyQuestions = () => {
    const {stundetInfo} = useContext(AppState);
    const [questions,setQuestions] = useState([]);
    const [loading,setLoading]=useState(false);
    const {username} = useParams();
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
    <div className='myquestions-page'>
        <h1 className='username-title'>
            { username === stundetInfo.username ? 'My' : username+`'s`} Questions 
            </h1>
        <div className="questions-list">
          {loading ? <LoadingQuestion/> : questions.map((question,key)=><Question question={question} key={key}/>)}
        </div>
    </div>
  )
}

export default MyQuestions
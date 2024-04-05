import React, { useContext, useEffect, useRef, useState } from 'react'
import './questioncontainer.scss';
import Question from '../Question/Question';
import LoadingQuestion from '../Question/LoadingQuestion';
import { AppState } from '../../App';
import axios from 'axios'
import { useParams } from 'react-router-dom'
const QuestionContainer = React.memo(()=>{
  const [loading,setLoading] = useState(true);
  const [questions,setQuestions] = useState([]);
  // const [questionsPage,setQuestionsPage] = useState(0);
  const {course_code} = useParams();
  const {sidebarSelected} = useContext(AppState);
  useEffect(()=>{
    setLoading(true)
    const data= async()=> {
      let response = null;
      console.log(sidebarSelected)
      console.log(course_code)
      if(sidebarSelected !== null || course_code){
        response = await axios.get(`http://localhost:8000/post/${sidebarSelected?sidebarSelected:course_code}`)
      }else{
        response = await axios.get(`http://localhost:8000/post/allquestions/1`)
      }
      setQuestions(response.data?.data? response.data?.data :[])
      setLoading(false)
    };
    data();
  },[sidebarSelected])
    
  
  return (
    <div  className='questions-container'>
        <div className="questions-list">
          {loading ? <LoadingQuestion/> : Object.keys(questions).map((id,key)=><Question question={questions[id]} key={key}/>)}
        </div>
    </div>
  )
})

export default QuestionContainer
import React, { useContext, useEffect, useRef, useState } from 'react'
import './questioncontainer.scss';
import Question from '../Question/Question';
import LoadingQuestion from '../Question/LoadingQuestion';
import FetchPost from '../../utilis/FetchPost';
import { AppState } from '../../App';
import axios from 'axios'

const QuestionContainer = React.memo(()=>{
  const [loading,setLoading] = useState(true);
  const [questions,setQuestions] = useState([]);
  // const [questionsPage,setQuestionsPage] = useState(0);
  const {sidebarSelected} = useContext(AppState);
  useEffect(()=>{
    setLoading(true)
    const data= async()=> {
      let response = null
      if(sidebarSelected!==null){
        response = await axios.get(`http://localhost:8000/post/${sidebarSelected.toUpperCase()}`)
      }else{
        response = await axios.get(`http://localhost:8000/post/allquestions/1`)
      }
      setQuestions(response.data?.data? response.data?.data :[])
    };
    data();
    setTimeout(()=>setLoading(false),200)
    
  },[sidebarSelected])
    
  
  return (
    <div  className='questions-container'>
        <div className="questions-list">
          {loading ? <LoadingQuestion/> : questions.map((question,key)=><Question question={question} key={key}/>)}
        </div>
    </div>
  )
})

export default QuestionContainer
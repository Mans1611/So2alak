import React, { useEffect, useRef, useState } from 'react'
import './questioncontainer.scss';
import Question from '../Question/Question';
import LoadingQuestion from '../Question/LoadingQuestion';
import FetchPost from '../../utilis/FetchPost';

const QuestionContainer = () => {
  const [loading,setLoading] = useState(true);
  const [questions,setQuestions] = useState([]);
  const [questionsPage,setQuestionsPage] = useState(0);

  useEffect(()=>{
    setLoading(true)
    const data= async()=> {
      const {data} = await FetchPost(`http://localhost:8000/post/allquestions/1`)
      setQuestions(data.data)
    };
    data();
    setLoading(false)
  },[])
    
  
  return (
    <div  className='questions-container'>
        <div className="questions-list">
          {loading ? <LoadingQuestion/> : questions.map((question,key)=><Question question={question} key={key}/>)}
        </div>
    </div>
  )
}

export default QuestionContainer
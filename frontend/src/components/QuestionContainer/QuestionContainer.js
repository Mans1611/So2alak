import React, { useEffect, useRef, useState } from 'react'
import './questioncontainer.scss';
import Question from '../Question/Question';
import Answer from '../Answer/Answer';
import axios from 'axios';
import LoadingQuestion from '../Question/LoadingQuestion';

const QuestionContainer = () => {
  const [loading,setLoading] = useState(true);
  const [questions,setQuestions] = useState([]);

  const [questionsPage,setQuestionsPage] = useState(0);

  useEffect(()=>{
    const fetchQuestions = async()=>{
      const result = await axios.get(`http://localhost:8000/post/allquestions/${questionsPage}`);
      setQuestions(result.data.data);
      setLoading(false)
    }
    fetchQuestions();
  },[questionsPage])
  
  
  
  return (
    <div  className='questions-container'>
        <div className="questions-list">
          {loading ? <LoadingQuestion/> : questions.map((question,key)=><Question question={question} key={key}/>)}
        </div>
    </div>
  )
}

export default QuestionContainer
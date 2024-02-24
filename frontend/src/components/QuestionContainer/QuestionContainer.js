import React, { useEffect, useState } from 'react'
import './questioncontainer.scss';
import Question from '../Question/Question';
import Answer from '../Answer/Answer';
// import axios from 'axios';
const QuestionContainer = () => {
  const [loading,setLoading] = useState(true);
  const [questions,setQuestions] = useState([]);
  // useEffect(()=>{
  //   const fetchQuestions = async()=>{
  //     const result = await axios.get('http://localhost:8000/post/allquestions');
  //     setQuestions(result.data.data);
  //     console.log(result.data)
  //   }

  //   fetchQuestions();
  //   setLoading(false);
  // },[])
  return (
    <div className='questions-container'>
        <div className="questions-list">
          
          {loading ? "loading" : questions.map((question,key)=><Question question={question} key={key}/>)}
        </div>
    </div>
  )
}

export default QuestionContainer
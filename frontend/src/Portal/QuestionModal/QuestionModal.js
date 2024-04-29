import React, { useEffect } from 'react'
import './questionmodal.scss';
import axios from 'axios';

const QuestionModal = ({question}) => {
  console.log(question);
  let img = null;
  if (question.data){
      img = `data:${question.mimtype};base64,${question.data}`;
  }
  
  useEffect(()=>{
    const fetchQuestion = async()=>{
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/post/getQuestion/?question_id=${question.question_id}`)
      console.log(res)
    }

    fetchQuestion()
  },[])
  return (
    <div className='modal'>
        <div className="question-modal-container">
            <div className="img-container">
              <img className='img-modal' src={img} alt="" />
            </div>
            <div className="question-details">
                <div className="question-">
                  <h2 className=''>{question.question}</h2>
                </div>
                <div className="question-options">
                  
                  <h2>Help</h2>
                  
                  <h2>Share</h2>
                </div>
                {/* {question} */}
            </div>
        </div>
    </div>
  )
}

export default QuestionModal
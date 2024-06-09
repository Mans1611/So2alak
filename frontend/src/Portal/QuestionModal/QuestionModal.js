import React, { useEffect, useState } from 'react'
import './questionmodal.scss';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HelpCircle from '../../components/Question/HelpCircle';

const QuestionModal = ({circle,question,setShowQuestionModal}) => {
  const [answers,setAnswers] = useState([]);
  useEffect(()=>{
    const fetchAnswers = async()=>{
      const {data,status} = await axios.get(`${process.env.REACT_APP_API_URL}/post/getQuestionsAnswers?q_id=${question.question_id}`)
      if(status === 200){
        setAnswers(data.data);
      }  
    }
    fetchAnswers();
  },[])
  

  const handleClose = (e)=>{
    if(Array.from(e.target.classList).includes('modal') || Array.from(e.target.classList).includes('close') || Array.from(e.target.classList).includes('close-icon')){
      setShowQuestionModal(false)
        }
    }
  return (
    <div onClick={handleClose} className='modal'>
        <div className="question-modal-container">
            <div className="img-container">
              <img className='img-modal' src={question.img_url} alt="" />
            </div>
            <div className="question-details">
                <div className="question flex">
                  <HelpCircle question={question}/>
                  <h2 className='question-content'>{question.question}</h2>
                </div>
                <div className="question-options">
                  <h2>
                  </h2>
                  <h2>Share</h2>
                </div>
                {/* {question} */}
            </div>
        </div>
    </div>
  )
}

export default QuestionModal
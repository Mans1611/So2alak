import React, { useContext, useEffect, useState } from 'react'
import './questionmodal.scss';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import HelpCircle from '../../components/Question/HelpCircle';
import { AppState } from '../../App';
import AskQuestion from '../../components/AskQuestion/AskQuestion';
import Answer from '../../components/Answer/Answer';
import ShareButton from '../../components/ShareButton/ShareButton';

const QuestionModal = ({circle,question,setShowQuestionModal}) => {
  const [answers,setAnswers] = useState([]);
  
  const {dark} = useContext(AppState);

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
    <div onClick={handleClose} className={`modal ${dark?'dark':''}`}>
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
                  <ShareButton/>
                 
                </div>
                {/* {question} */}
            <AskQuestion isAnswer={true} questionDetails={question}/>

            {
              answers?.map((answer,key)=><Answer key={key} answer={answer}/>)
            }
            </div>
        </div>
    </div>
  )
}

export default QuestionModal
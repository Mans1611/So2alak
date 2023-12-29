import React, { useRef, useState } from 'react'
import './askquestion.scss';

const AskQuestion = () => {
    const [question,setQuestion]=useState('');
    const questionInput = useRef(null);
   const detectLang = (question)=>{
    if (question.trim()!=='') 
        if(!question[0].match(/^[A-Za-z0-9]$/))
            questionInput.current.style.direction = 'rtl'
        else{
            questionInput.current.style.direction = 'ltr'
        }
   }
   return (
    <div className='askQuestion-container'>
        <div className="askQuestion-wrapeer">
            <textarea ref={questionInput} onChange={(e)=>{detectLang(e.target.value);setQuestion(e.target.value);}} placeholder='Ask Your Question' type="text" />
            <button disabled={question.trim()==''}>Ask</button>
        </div>
    </div>
  )
}

export default AskQuestion
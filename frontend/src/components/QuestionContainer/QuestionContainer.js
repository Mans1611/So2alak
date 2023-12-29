import React from 'react'
import './questioncontainer.scss';
import Question from '../Question/Question';
const QuestionContainer = () => {
  return (
    <div className='questions-container'>
        <div className="questions-list">
            <Question/>
        </div>
    </div>
  )
}

export default QuestionContainer
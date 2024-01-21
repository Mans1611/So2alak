import React from 'react'
import './questioncontainer.scss';
import Question from '../Question/Question';
import Answer from '../Answer/Answer';
const QuestionContainer = () => {
  return (
    <div className='questions-container'>
        <div className="questions-list">
            <Question/>
            <Answer/>
        </div>
    </div>
  )
}

export default QuestionContainer
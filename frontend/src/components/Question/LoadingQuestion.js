import React from 'react'
import './question.scss';

const LoadingQuestion = () => {
  return (
    <div className='question'>
      <div style={{'alignItems':'center'}} className="flex">
            <div  className={`question-help`}>
                <div className="help-wrapper">
                    <div className={`circle loading-ques`}></div>
                    <h3 className='help-counts'></h3>
                </div>
            </div>
            <div className='question-wrapper'>
                <div className="question-content loading">
                    <p></p>
                </div>
            </div>
          </div>

    </div>
  )
}

export default LoadingQuestion
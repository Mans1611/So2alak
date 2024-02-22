import React, { useRef, useState } from 'react'
import './heartcomponent.scss'
import AskQuestion from '../AskQuestion/AskQuestion'
import QuestionContainer from '../QuestionContainer/QuestionContainer'
const HeartComponent = () => {
  const [dark,setDark]=useState(false)
 
  return (
    <div className={`heartcomponent ${dark?'dark':''}`}>
        <AskQuestion/>
        <QuestionContainer/>
    </div>
  )
}

export default HeartComponent
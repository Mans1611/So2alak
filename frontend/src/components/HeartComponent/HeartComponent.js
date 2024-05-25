import React, { useContext, useEffect, useRef} from 'react'
import './heartcomponent.scss'
import AskQuestion from '../AskQuestion/AskQuestion'
import QuestionContainer from '../QuestionContainer/QuestionContainer'
import { AppState } from '../../App'


const HeartComponent = ({children}) => {
  const {dark}=useContext(AppState)
  
  return (
    <div className={`heartcomponent ${dark?'dark':''}`}>
        {children}
    </div>
  )
}

export default HeartComponent;